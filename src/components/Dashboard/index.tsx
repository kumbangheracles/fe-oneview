"use client";

import { SlLogout } from "react-icons/sl";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { ModalAlert } from "../ModalAlert";
import { toast } from "sonner";
import { encrypt } from "@/lib/encryption";
import { useRouter } from "next/navigation";
interface PropTypes {
  role: "admin" | "member";
}

const DashboardPage = (prop: PropTypes) => {
  const { role } = prop;
  const session = useSession();
  const [isModalOpen, setIsModalOpen] = useState<Boolean>(false);
  const router = useRouter();

  const handleLogout = () => {
    try {
      signOut();

      toast("Logout Success ! ! !");
    } catch (error) {
      toast("Logout Failed ! ! !");
      console.log("Error logout: ", error);
    } finally {
      setIsModalOpen(false);
    }
  };
  const getProfileImage = (src?: string) => {
    if (!src) return "/images/default-img.jpg";

    if (src.startsWith("http://") || src.startsWith("https://")) return src;

    if (src.startsWith("/")) return src;

    return `/images/${src}`;
  };

  console.log("Session: ", session);

  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <Card className="w-[90%] h-auto base-sky-bg shadow-xl relative lg:w-[60%]">
        <Button
          onClick={() => setIsModalOpen(true)}
          className="text-[7px] flex items-center  absolute left-2 top-2 sm:text-sm"
        >
          <span>{"<-"}</span>
          <span>Log Out</span>
        </Button>

        <Badge variant={"default"} className=" absolute right-2 top-2 text-xl">
          <span className="text-[10px] sm:text-xl">
            {role === "admin" ? "Admin" : "Member"}
          </span>
        </Badge>

        <CardHeader className="flex items-center flex-col gap-1 justify-center">
          <div className="flex w-[50px] h-[50px] sm:w-[100px] sm:h-[100px] rounded-full border-2 border-sky-50 justify-center items-center overflow-hidden">
            <Image
              src={getProfileImage(session?.data?.user?.profilePicture)}
              alt="profile picture"
              className="object-contain w-full h-full"
              width={100}
              height={100}
            />
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 justify-center m-auto text-[7px] sm:w-full lg:w-[90%] sm:text-sm">
          {session?.data?.user?.provider === "local" && (
            <Button
              className="h-[20px] sm:text-sm sm:h-[30px]"
              onClick={() => router.push("/upload-profile-img")}
            >
              <span className="text-[7px] sm:text-sm">{"<-"}</span>
              <span className="text-[7px] sm:text-sm">
                Update Profile Picture
              </span>
            </Button>
          )}

          <div className="flex gap-2 items-center">
            <span className="w-[100px] font-bold bg-white rounded-md border-black border-2 p-1">
              Full Name
            </span>
            <span className="w-full bg-white rounded-md border-black border-2 p-1">
              {session?.data?.user?.fullName}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <span className="w-[100px] font-bold bg-white rounded-md border-black border-2 p-1">
              Username
            </span>
            <span className="w-full bg-white rounded-md border-black border-2 p-1">
              {session?.data?.user?.username}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <span className="w-[100px] font-bold bg-white rounded-md border-black border-2 p-1">
              Email
            </span>
            <span className="w-full bg-white rounded-md border-black border-2 p-1">
              {session?.data?.user?.email}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <span className="w-[100px] font-bold bg-white rounded-md border-black border-2 p-1">
              Phone Number
            </span>
            <span className="w-full bg-white rounded-md border-black border-2 p-1">
              {session?.data?.user?.phoneNumber || "Not Availble"}
            </span>
          </div>
        </CardContent>

        <ModalAlert
          title="Log Out "
          description="Are you sure want to logout?"
          cancelButton="Cancel"
          showCancel
          open={isModalOpen as boolean}
          okButton="Yes"
          onOk={() => handleLogout()}
          onCancel={() => setIsModalOpen(false)}
        />
      </Card>
    </div>
  );
};

export default DashboardPage;
