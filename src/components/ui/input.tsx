import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "bg-transparent w-full h-full border-none outline-none pl-2",
        className
      )}
      {...props}
    />
  );
}

export { Input };
