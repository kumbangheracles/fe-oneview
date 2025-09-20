"use client";
import { ArrowBigRight } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const NotFoundPage = () => {
  const router = useRouter();
  const session = useSession();

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="text-5xl text-shadow-md text-sky-500">404</h1>
        <p className="text-3xl text-sky-950">This page could not be found</p>
        <Button className="mt-4 w-fit" onClick={() => router.back()}>
          <span>Go Back</span>
          <ArrowBigRight />
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
