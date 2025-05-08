"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import useUserDetailsStore from "@/store/store";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IconLoader3 } from "@tabler/icons-react";

interface MessageType {
  _id: string;
  content: string;
  senderName?: string;
  owner?: string;
  createdAt: string;
  updatedAt: string;
}

const HeroSection = () => {
  const { username } = useUserDetailsStore();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const prevMessagesRef = useRef<string>("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const fetchMessages = async () => {
    if (!username) return;

    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.get(
        `/api/get-messages?username=${username}`
      );

      const incoming = JSON.stringify(response.data.data || []);
      if (incoming !== prevMessagesRef.current) {
        prevMessagesRef.current = incoming;
        setMessages(response.data.data || []);
        setTimeout(() => {
          scrollAreaRef.current?.scrollTo({
            top: scrollAreaRef.current.scrollHeight,
            behavior: "smooth",
          });
        }, 100);
      }
    } catch (error) {
      setError("Failed to fetch messages");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    const intervalId = setInterval(fetchMessages, 5000);
    return () => clearInterval(intervalId);
  }, [username]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="w-full h-[400px] sm:h-[500px] p-4">
      <ScrollArea ref={scrollAreaRef} className="h-full max-h-[500px]">
        {isLoading && messages.length === 0 ? (
          <div className="flex justify-center items-center">
            <IconLoader3 className="w-4 h-4 animate-spin" />
          </div>
        ) : (
          messages.map((msg, index) => (
            <Card
              key={msg._id || index}
              className="mb-4 p-0 hover:bg-accent/50 transition-colors"
            >
              <CardContent className="w-full p-4">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <p className="text-sm flex-1">{msg.content}</p>
                  <div className="flex flex-row md:flex-col justify-between md:justify-start items-end gap-2 text-muted-foreground min-w-[120px]">
                    <p className="text-xs">{msg.senderName}</p>
                    <p className="text-xs">{formatDate(msg.createdAt)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </ScrollArea>
    </div>
  );
};

export default HeroSection;
