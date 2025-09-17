"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { CustomIcon } from "@/components/ui/icon";
import googleIcon from "../../../assets/icons/google.svg";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const cardData = [
  { id: 1, icon: googleIcon },
  { id: 2, icon: googleIcon },
  { id: 3, icon: googleIcon },
];
const Login = () => {
  const [openPass, setOpenPass] = useState<Boolean>(false);
  const [isShadow, setIsShadow] = useState<Boolean>(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const router = useRouter();
  return (
    <Card className="base-sky-bg border shadow-md font-mono w-[450px] p-4">
      <CardHeader className="flex flex-col justify-center items-center text-center">
        <h4 className="text-xl font-bold">Sign in with Email or Username</h4>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          {/* <span className="wolf-text text-sm">Email or Username</span> */}
          <Input
            iconLeft={<MdEmail />}
            className="border-none"
            type="email"
            aria-label="Email or Username"
            placeholder="Email or Username"
          />
        </div>
        <div className="flex flex-col gap-2">
          {/* <span className="wolf-text text-sm">Password</span> */}
          <Input
            iconLeft={<RiLock2Fill />}
            type={openPass ? "text" : "password"}
            className="border-none"
            aria-label="Password"
            iconRight={openPass ? <FaEye /> : <FaEyeSlash />}
            isClickable={true}
            placeholder="Password"
            iconRightOnClick={() => setOpenPass((prev) => !prev)}
          />
        </div>
        <div className="flex justify-between">
          <div className="flex gap-1">
            <span className="text-black text-sm text-right  transition-all">
              Don't have account?
            </span>
            <span
              onClick={() => router.push("/auth/register")}
              className="text-black text-sm text-right underline cursor-pointer hover:text-gray-300 transition-all"
            >
              Sign Up
            </span>
          </div>
          <span className="text-black text-sm text-right cursor-pointer hover:text-gray-300 transition-all">
            Forgot password?
          </span>
        </div>
        <div>
          <Button className="bg-black text-white w-full">Sign in</Button>
        </div>
      </CardContent>
      <CardFooter className="w-full flex flex-col justify-center mt-[-10px] gap-3">
        <span className="wolf-text text-sm text-center">Or sign in with</span>
        <div className="flex justify-around w-full gap-1">
          {cardData.map((card) => (
            <Card
              key={card.id}
              className={`w-full flex justify-center cursor-pointer p-1 select-none ${
                activeCard === card.id ? "" : "shadow-md"
              }`}
              onMouseDown={() => setActiveCard(card.id)}
              onMouseUp={() => setActiveCard(0)}
            >
              <CustomIcon iconSrc={card.icon} />
            </Card>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default Login;
