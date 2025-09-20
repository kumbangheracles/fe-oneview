"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { ArrowBigRight } from "lucide-react";
import { toast } from "sonner";
import { useEffect } from "react";
import oneAxios from "@/lib/axios/oneAxios";
import { signIn, useSession } from "next-auth/react";
import NotFoundPage from "./NotFound";
const GoogleLoginSuccess = () => {
  const { data, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      toast("Login with google success ! ! !");
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      router.push("/auth/login");
      return;
    }

    signIn("credentials", {
      redirect: false,
      identifier: "google",
      password: token,
    }).then((res) => {
      if (res?.ok) {
        setTimeout(() => {
          router.push("/dashboard");
        }, 3000);
      } else {
        toast("Login with google failed ! ! !");
        setTimeout(() => {
          router.push("/auth/login");
        }, 3000);
      }
    });
  }, [token, router, status]);
  return (
    <>
      {token ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <div className="flex flex-col justify-center items-center gap-4 ">
            <p className="text-3xl text-sky-950">Login with Google Success</p>

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
      ) : (
        <>
          <NotFoundPage />
        </>
      )}
    </>
  );
};

export default GoogleLoginSuccess;
