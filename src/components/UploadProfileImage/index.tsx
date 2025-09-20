"use client";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Send, SkipForward, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import oneAxios from "@/lib/axios/oneAxios";
import { signIn, useSession } from "next-auth/react";
import { ErrorHandler } from "@/lib/errorHandler";
import GlobalLoading from "../ui/loading";
import { toast } from "sonner";

const UploadProfileImgPage = () => {
  const router = useRouter();
  const session = useSession();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string>(
    session?.data?.user?.profilePicture as string
  );
  const [loading, setLoading] = useState<Boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setFile(file);
      setPreview(objectUrl);
    }
  };

  const reLogin = async () => {
    try {
      setLoading(true);
      const payload = {
        identifier: session.data?.user?.username || session.data?.user?.email,
        password: session.data?.user?.password,
      };

      await signIn("credentials", {
        ...payload,
        redirect: false,
      });

      router.push("/upload-profile-img");

      router.push("/dashboard");
    } catch (error) {
    } finally {
      setLoading(true);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await oneAxios.post("/media/upload-single", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${session.data?.accessToken}`,
        },
      });

      const url = res.data.data.secure_url;

      const respatch = await oneAxios.patch(
        `/auth/update/${session?.data?.user?._id}`,
        {
          profilePicture: url,
        }
      );

      toast("Success add profile picture ! ! !");

      await session.update({
        ...session,
        user: {
          ...session?.data?.user,
          profilePicture: url,
        },
      });
      // router.push("/dashboard");
      setIsSuccess(true);
    } catch (error) {
      ErrorHandler(error);
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card className="w-full m-2 h-auto flex justify-center flex-col items-center relative sm:w-[60%]">
        {isSuccess ? (
          <></>
        ) : (
          <Button
            disabled={loading ? true : false}
            className=" w-[10px] h-[10px] absolute top-3 right-3 text-[10px] sm:text-[17px] sm:w-auto sm:h-auto"
            onClick={() => reLogin()}
          >
            <span>Skip</span>
          </Button>
        )}

        <CardHeader>
          <span className="text-[10px] sm:text-[17px]">
            Want to add some profile pict?
          </span>
        </CardHeader>
        <CardContent className="flex flex-col justify-center items-center gap-6">
          <div className=" w-[70px] h-[70px]  sm:w-[160px] sm:h-[160px] rounded-full border-black border-2 overflow-hidden">
            <Image
              src={preview || "/images/default-img.jpg"}
              width={160}
              height={160}
              className="object-cover w-full h-full"
              alt="profile-image"
            />
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="flex items-center gap-4">
            {isSuccess ? (
              <Button
                disabled={loading ? true : false}
                className="flex items-center text-[10px] sm:text-sm gap-2 w-full"
                type="button"
                onClick={() => reLogin()}
              >
                Go to dashboard {"->"}
              </Button>
            ) : (
              <>
                {preview ? (
                  <>
                    <Button
                      disabled={loading ? true : false}
                      className="flex items-center gap-2 w-[130px]"
                      type="button"
                      onClick={() => inputRef.current?.click()}
                    >
                      {loading ? (
                        <GlobalLoading />
                      ) : (
                        <>
                          <span className="text-[10px] sm:text-sm">
                            Change image
                          </span>{" "}
                          <Upload />
                        </>
                      )}
                    </Button>
                    <Button
                      disabled={loading ? true : false}
                      className="flex items-center gap-2 w-[130px]  hover:bg-green-300"
                      type="button"
                      onClick={() => handleUpload()}
                    >
                      {loading ? (
                        <GlobalLoading />
                      ) : (
                        <>
                          <span className="text-[10px] sm:text-sm">Submit</span>
                          <Send />
                        </>
                      )}
                    </Button>
                  </>
                ) : (
                  <Button
                    disabled={loading ? true : false}
                    className="flex items-center gap-2 w-[130px]"
                    type="button"
                    onClick={() => inputRef.current?.click()}
                  >
                    {loading ? (
                      <GlobalLoading />
                    ) : (
                      <>
                        <span className="text-[10px] sm:text-sm">
                          Add image
                        </span>
                        <Upload className="text-[10px] sm:text-sm" />
                      </>
                    )}
                  </Button>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default UploadProfileImgPage;
