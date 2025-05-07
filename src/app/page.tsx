import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/ui/spotlight-new";
import { Star } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div className="relative w-full h-screen z-[1000] overflow-hidden">
      <Spotlight />
      <div className="w-full h-screen flex items-center justify-center">
        <div>
          <ShimmerButton className="px-5 py-2 flex items-center justify-center">
            <Star
              className="-ms-1 me-2 text-black dark:text-white"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
            <span className="flex text-sm gap-2 text-black dark:text-white">
              Give a Star on Github
              <span className="text-xs flex items-center justify-center text-black dark:text-white">729</span>
            </span>
          </ShimmerButton>
        </div>
      </div>
    </div>
  );
};

export default page;
