"use client";
import { ReactNode } from "react";
import { RxAvatar } from "react-icons/rx";
import { Button } from "../ui/button";

interface PropTypes {
  children: ReactNode;
}

const AppLayout = (prop: PropTypes) => {
  const { children } = prop;
  return (
    <div>
      <div className="navbar-layout shadow-md fixed top-0 flex justify-between px-3.5 w-full py-3.5 items-center bg-white">
        <div className="logo-navbar flex items-center gap-3">
          <RxAvatar
            className="text-4xl
          "
          />
          <h4 className="font-bold">ONE VIEW</h4>
        </div>

        <Button className="bg-sky-50 text-black border shadow-none">
          Sign Up
        </Button>
      </div>

      {children}
    </div>
  );
};

export default AppLayout;
