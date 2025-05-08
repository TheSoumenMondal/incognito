"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";
import { toast } from "sonner";

const Message = () => {
  const router = useRouter();
  const [message, setMessage] = useState<string>("");
  const [senderName, setSenderName] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  const searchParams = useParams();
  const id = searchParams.id;

  const handleSubmit = async () => {
    if (!id) {
      console.error("Owner ID not found in URL.");
      toast.error("Something went wrong. Try refreshing.");
      return;
    }

    let finalSenderName = senderName;

    if (!finalSenderName || finalSenderName.trim().length === 0) {
      finalSenderName = uniqueNamesGenerator({
        dictionaries: [colors, adjectives, animals],
      });
      setSenderName(finalSenderName);
    }

    try {
      setSubmitting(true);

      await axios.post("/api/create-message", {
        content: message,
        senderName: finalSenderName,
        owner_id: id,
      });

      toast.success("Message sent successfully!");
      setMessage("");
      setSenderName("");
      router.push("/");
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 403) {
          toast.error("This user is not accepting messages.");
          return;
        } else if (error.response?.status === 404) {
          toast.error("User not found.");
          return;
        } else {
          toast.error("Failed to send message.");
          return;
        }
      } else {
        toast.error("Unexpected error occurred.");
        return;
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center px-10">
      <div className="max-w-md w-full flex flex-col">
        <p className="text-xl mb-3 md:text-2xl font-bold">Say something here</p>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full h-32"
          placeholder="Type your message here."
        />
        <Input
          value={senderName}
          onChange={(e) => setSenderName(e.target.value)}
          placeholder="Your Anonymous name (Optional)"
          className="max-w-md flex-row select-none placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-4"
        />
        <Button
          onClick={handleSubmit}
          disabled={message.length === 0 || submitting}
          className="mt-4 cursor-pointer"
          variant={"outline"}
        >
          {submitting ? "Sending..." : "Send"}
        </Button>
      </div>
    </div>
  );
};

export default Message;
