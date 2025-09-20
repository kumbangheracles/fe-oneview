"use client";

import { useSession, signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
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

      setTimeout(() => {
        if (data?.user?.profilePicture === "/images/default-img.jpg") {
          router.push("/upload-profile-img");
        } else {
          router.push("/dashboard");
        }
      }, 2000);
    }
  }, [token]);

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

          <p>You'll be redirect to dashboard page, please wait</p>
          {/* <Button
              className="mt-4 w-fit"
              onClick={() => router.push("/dashboard")}
            >
              <span>Go to Dashboard</span>
              <ArrowBigRight />
            </Button> */}
        </div>
      </div>
    </>
  );
};

export default LoginSuccessPage;
