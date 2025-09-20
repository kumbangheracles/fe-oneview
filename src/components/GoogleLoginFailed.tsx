"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ArrowBigRight } from "lucide-react";

const GoogleLoginFailed = () => {
  const router = useRouter();
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="text-5xl text-shadow-md text-sky-500">404</h1>
        <p className="text-3xl text-sky-950">Failed Login Google</p>
        <Button className="mt-4 w-fit" onClick={() => router.back()}>
          <span>Go Back</span>
          <ArrowBigRight />
        </Button>
      </div>
    </div>
  );
};

export default GoogleLoginFailed;
