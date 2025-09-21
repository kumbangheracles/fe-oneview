"use client";
import Image from "next/image";
import * as React from "react";

interface PropTypes extends React.InputHTMLAttributes<HTMLDivElement> {
  iconSrc: string;
}

const CustomIcon = React.forwardRef<HTMLDivElement, PropTypes>(
  ({ iconSrc, ...props }, ref) => {
    return (
      <>
        <div
          ref={ref}
          {...props}
          className="flex justify-center items-center w-[30px] h-[30px]"
        >
          <Image
            className="w-full h-full"
            src={iconSrc}
            width={100}
            height={100}
            alt="icon-default"
          />
        </div>
      </>
    );
  }
);

CustomIcon.displayName = "CustomIcon";

export { CustomIcon };
