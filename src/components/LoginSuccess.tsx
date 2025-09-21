"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const LoginSuccessPage = () => {
  const { data, status } = useSession();
  const router = useRouter();
  //   const searchParams = useSearchParams();
  const token = data?.accessToken;

  useEffect(() => {
    if (token) {
      toast("Login success ! ! !");

      const timeoutId = setTimeout(() => {
        if (data?.user?.profilePicture === "/images/default-img.jpg") {
          router.push("/upload-profile-img");
        } else {
          router.push("/dashboard");
        }
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [token, data?.user?.profilePicture, router]);

  useEffect(() => {
    if (!token) {
      router.push("/auth/login");
      return;
    }
  }, [token, router, status]);
  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-4 ">
          <p className="text-3xl text-sky-950">Login Success</p>

          <p>You&apos;ll be redirected to dashboard page, please wait</p>
        </div>
      </div>
    </>
  );
};

export default LoginSuccessPage;
