"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUserDetailsStore from "@/store/store";
import {
  IconEye,
  IconEyeOff,
  IconLoader3,
  IconLockAccess,
} from "@tabler/icons-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Settings = () => {
  const router = useRouter();
  const { username, set_User_Passowrd } = useUserDetailsStore();
  const [password, setPassword] = useState<string>("");
  const [inputType, setInputType] = useState<"text" | "password">("password");
  const [loading, setLoading] = useState<boolean>(true);

  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  const isPasswordStrong = strongPasswordRegex.test(password);

  const handleIconClick = () => {
    setInputType(inputType === "text" ? "password" : "text");
  };

  const handleGoToConsole = async () => {
    if (!username || !password) {
      toast.error("Invalid Password or Username", {
        description:
          "Please provide a proper username and password to continue.",
        position: "bottom-right",
      });
      return;
    }

    try {
      const response = await axios.post("/api/create-account", {
        username,
        password,
      });

      const { status } = response.data;

      if (status === 401) {
        toast.error("Incorrect Password", {
          description: `Provided password is wrong against ${username} account.`,
          position: "bottom-right",
        });
        return;
      }

      if (status === 409) {
        toast.error("Username already exists", {
          description: "Try logging in instead.",
          position: "bottom-right",
        });
        return;
      }

      if (status === 200) {
        set_User_Passowrd(password);
        toast.success("Welcome back.", {
          description: `Welcome back ${username}`,
          position: "bottom-right",
          duration: 2000,
        });
        router.push("/console");
        return;
      }

      if (status === 201) {
        set_User_Passowrd(password);
        toast.success("Account created successfully.", {
          description: `Welcome ${username}`,
          position: "bottom-right",
          duration: 2000,
        });
        router.push("/console");
        return;
      }

      toast.error("Unexpected error. Try again later.", {
        position: "bottom-right",
      });
    } catch (error) {
      toast.error("Internal server error. Please contact the developer.", {
        position: "bottom-right",
      });
      console.error("API error:", error);
    }
  };

  useEffect(() => {
    if (username === "") {
      router.replace("/");
    } else {
      setLoading(false);
    }
  }, [username, router]);

  const passwordStrengthMessage = password
    ? isPasswordStrong
      ? "Your password is strong."
      : "Your password must contain at least 8 characters, including an uppercase letter, a lowercase letter, a number, and a special character (e.g., !@#$%)."
    : "";

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <IconLoader3 className="animate-spin w-8 h-8 text-gray-500" />
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex items-center justify-center p-10">
      <div className="relative max-w-md w-full">
        <Label className="py-4 text-xl">Set a strong password</Label>

        <div className="max-w-md flex-row select-none placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
          <div className="flex items-center opacity-60">
            <IconLockAccess className="w-5 h-5 hover:scale-110 hover:text-yellow-300 transition-colors text-gray-500" />
          </div>

          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={inputType}
            className="border-0 flex-grow shadow-none"
            aria-label="Password"
          />

          <div
            className="flex items-center px-3 opacity-60 cursor-pointer"
            onClick={handleIconClick}
            role="button"
            aria-label={
              inputType === "password" ? "Show password" : "Hide password"
            }
          >
            {inputType === "password" ? (
              <IconEye className="w-5 h-5 text-gray-500" />
            ) : (
              <IconEyeOff className="w-5 h-5 text-gray-500" />
            )}
          </div>
        </div>

        <p
          className={`text-[10px] mt-5 select-none ${
            isPasswordStrong && password !== ""
              ? "text-green-400"
              : "text-red-800"
          }`}
        >
          {passwordStrengthMessage}
        </p>

        <Button
          disabled={password === "" || !isPasswordStrong}
          onClick={handleGoToConsole}
          className="w-full mt-5 cursor-pointer"
          variant={"outline"}
        >
          Go to Console
        </Button>
      </div>
    </div>
  );
};

export default Settings;
