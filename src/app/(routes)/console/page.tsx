"use client";

import React, { useEffect, useState } from "react";
import Navbar from "./_components/Navbar";
import HeroSection from "./_components/HeroSection";
import useUserDetailsStore from "@/store/store";
import axios from "axios";
import { IconLoader3 } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const Console = () => {
  const { username, user_password } = useUserDetailsStore();
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState<boolean>(true);
  const router = useRouter();
  useEffect(() => {
    const checkAuth = async () => {
      if (!username || !user_password) {
        setLoading(false);
        return;
      }
      try {
        const res = await axios.post("/api/check-auth", {
          username,
          password: user_password,
        });
        setAuth(res.data.success);
      } catch (err: any) {
        console.error("Auth error response:", err.response?.data);
        if (err.response?.status === 401) {
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <IconLoader3 className="animate-spin w-6 h-6" />
      </div>
    );
  }

  if (!auth) {
    return router.push("/");
  }

  return (
    <div className="w-full h-screen flex px-10 md:px-24 lg:px-64 py-5 flex-col">
      <Navbar />
      <HeroSection />
    </div>
  );
};

export default Console;
