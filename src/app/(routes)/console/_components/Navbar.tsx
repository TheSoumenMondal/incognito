"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import useUserDetailsStore from "@/store/store";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Navbar = () => {
  const { username } = useUserDetailsStore();
  const [link, setLink] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [acceptingMessages, setAcceptingMessages] = useState<boolean>(true);

  useEffect(() => {
    const getUser = async () => {
      if (!username) return;

      try {
        const response = await axios.get(`/api/get-user?username=${username}`);
        const user = response.data?.data;
        if (user?._id) {
          setUserId(user._id);
          setAcceptingMessages(user.isReceivingMessages ?? true);
        } else {
          console.warn("User data incomplete");
        }
      } catch (err) {
        console.error("Error fetching user ID:", err);
      }
    };

    getUser();
  }, [username]);

  useEffect(() => {
    if (!username) return;

    const updateState = async () => {
      try {
        await axios.put("/api/set-accept-message", {
          username,
          isAccepting: acceptingMessages,
        });
      } catch (error) {
        console.error("Failed to update message settings", error);
      }
    };

    updateState();
  }, [acceptingMessages, username]);

  const handleClick = () => {
    if (!userId) return;

    const appUrl = process.env.NEXT_PUBLIC_APP_URL!;
    setLink(`${appUrl}/message/${userId}`);
  };

  const handleCopy = () => {
    if (!link) return;

    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const handleDelete = async () => {
    if (!userId) {
      console.warn("User ID is not available");
      return;
    }

    try {
      const res = await axios.delete("/api/delete-messages", {
        data: { userId },
      });

      if (res.status === 200) {
        toast.success("Messages deleted successfully",{
          description : "Message deleted successfully."
        })
      } else {
        console.warn("Unexpected response:", res);
      }
    } catch (error) {
      console.error("Error deleting messages:", error);
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full h-16 flex justify-between items-center">
        <span className="text-sm">{username}</span>
        <div className="flex flex-row justify-center items-center gap-2">
          <Label className="text-[12px]">Accept Messages</Label>
          <Switch
            checked={acceptingMessages}
            onCheckedChange={(checked) => setAcceptingMessages(checked)}
            className="cursor-pointer"
          />
        </div>
      </div>

      <Separator />

      <div className="flex items-center justify-center w-full flex-col">
        <Input
          readOnly
          value={link}
          className="max-w-md flex-row
            cursor-not-allowed
            text-sm
            pointer-events-none
            placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-6"
        />

        <Button
          onClick={handleClick}
          className="mt-3 cursor-pointer max-w-md w-full"
          variant={"outline"}
        >
          Create link
        </Button>

        <Button
          onClick={handleCopy}
          className={`mt-3 cursor-pointer max-w-md w-full ${
            copied ? "text-green-500 hover:text-green-600" : ""
          }`}
          variant={"outline"}
        >
          {copied ? "Copied!" : "Copy URL"}
        </Button>
      </div>

      <div className="w-full flex items-center mt-4 justify-end gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="px-2 py-1" variant={"secondary"}>
              Clear Inbox
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription className="flex justify-end gap-3">
              <DialogClose asChild>
                <Button variant={"outline"}>Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  onClick={handleDelete}
                  className="bg-red-400 hover:bg-red-700 text-white"
                >
                  Clear
                </Button>
              </DialogClose>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Navbar;
