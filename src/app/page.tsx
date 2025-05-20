"use client";

import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spotlight } from "@/components/ui/spotlight-new";
import { TextEffect } from "@/components/ui/text-effect";
import { useDebounce } from "@/hooks/useDebounce";
import useUserDetailsStore from "@/store/store";
import axios from "axios";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [starCount, setStarCount] = useState<number>(0);
  const { username, setUsername } = useUserDetailsStore();
  const [message, setMessage] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const getStartCount = async () => {
      const res = await axios.get("/api/get-star-count");
      setStarCount(res.data.stargazers_count);
    };
    getStartCount();
  }, []);

  const debouncedUsername = useDebounce(username, 500);

  useEffect(() => {
    const checkUniqueness = async () => {
      if (debouncedUsername.length >= 5) {
        try {
          const res = await axios.post("/api/check-username-unique", {
            username,
          });
          setMessage(res.data.message);
        } catch (err) {
          setMessage("Error checking username");
          console.warn(err);
        }
      } else {
        setMessage("");
      }
    };

    checkUniqueness();
  }, [debouncedUsername, username]);

  const handleClick = () => {
    router.push("https://github.com/TheSoumenMondal/incognito");
  };

  const handleSettings = () => {
    router.push("/settings");
  };

  return (
    <div className="relative w-full h-screen z-[1000] overflow-hidden">
      <Spotlight />
      <div className="w-full h-screen space-y-5 flex items-center justify-center flex-col">
        {/* Star Count  */}

        <div>
          <ShimmerButton
            onClick={handleClick}
            className="px-5 py-2 flex items-center justify-center"
          >
            <Star
              className="-ms-1 me-2 text-black dark:text-white"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
            <span className="flex text-sm gap-2 ">
              Give a Star on Github
              <span className="font-bold flex items-center justify-center text-black dark:text-white">
                {starCount}
              </span>
            </span>
          </ShimmerButton>
        </div>

        <div className="w-full px-10 flex flex-col items-center justify-center">
          {/* Headings  */}
          <div className="w-fit flex flex-col gap-2">
            <TextEffect
              per="char"
              preset="fade"
              className=" text-3xl md:text-5xl text-center font-bold"
            >
              Get Real, Honest Feedback, Anonymously
            </TextEffect>
            <TextEffect
              per="line"
              as="p"
              segmentWrapperClassName="overflow-hidden block"
              variants={{
                container: {
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.2 },
                  },
                },
                item: {
                  hidden: {
                    opacity: 0,
                    y: 40,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.4,
                    },
                  },
                },
              }}
              className="text-sm text-center"
            >
              Let your friends tell you what they really think—no filters, no
              names, no pressure.
            </TextEffect>
          </div>

          <div className="w-auto flex flex-col md:flex-row gap-3 items-center justify-center mt-8">
            {/* Username Input with Prefix */}
            <div
              className="relative max-w-md flex-row
            placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            >
              <span className="inset-y-0  flex items-center pl-3 text-muted-foreground">
                incognito://
              </span>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
              />
            </div>

            {/* Get Started Button */}

            <div className="flex md:hidden flex-col items-start">
              <p
                className={`text-xs mt-1 ${
                  message.includes("available")
                    ? "text-green-500"
                    : message.includes("taken")
                    ? "text-red-500"
                    : "text-muted-foreground"
                }`}
              >
                {message}
              </p>
            </div>

            <Button
              onClick={handleSettings}
              className="w-full md:w-auto cursor-pointer"
              variant="outline"
            >
              {message.includes("next") ? "Next" : "Continue"}
            </Button>
          </div>
          <div className="md:flex hidden flex-col items-start">
            <p
              className={`text-xs mt-2 ${
                message.includes("available")
                  ? "text-green-500"
                  : message.includes("taken")
                  ? "text-red-500"
                  : "text-muted-foreground"
              }`}
            >
              {message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
