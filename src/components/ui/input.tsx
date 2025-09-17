"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  iconRightOnClick?: () => void;
  isClickable?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      iconLeft,
      iconRight,
      iconRightOnClick,
      isClickable,
      ...props
    },
    ref
  ) => {
    const [isFocus, setIsFocus] = useState<boolean>(false);

    return (
      <div
        // onFocus={() => setIsFocus(true)}

        className={`flex items-center rounded-md border border-input bg-gray-50 px-3 py-1 shadow-sm focus-within:ring-1 focus-within:ring-ring transition-all`}
      >
        {iconLeft && (
          <span className="mr-2 text-muted-foreground">{iconLeft}</span>
        )}
        <input
          type={type}
          className={cn(
            "flex h-7 w-full bg-transparent text-base placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          ref={ref}
          {...props}
        />
        {iconRight && (
          <span
            className={`ml-2 text-muted-foreground ${cn(
              isClickable && "cursor-pointer"
            )}`}
            onClick={iconRightOnClick}
          >
            {iconRight}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
