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

interface PasswordInputProps {
  placeholder: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ placeholder }) => {
  const [openPass, setOpenPass] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <Input
        type={openPass ? "text" : "password"}
        className="border-none"
        placeholder={placeholder}
        iconRight={openPass ? <FaEye /> : <FaEyeSlash />}
        isClickable
        iconRightOnClick={() => setOpenPass((prev) => !prev)}
      />
    </div>
  );
};

const Register = () => {
  const [openPass, setOpenPass] = useState<Boolean>(false);
  const [isShadow, setIsShadow] = useState<Boolean>(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const router = useRouter();
  return (
    <Card className="base-sky-bg border shadow-md font-mono w-[450px] p-4">
      <CardHeader className="flex flex-col justify-center items-center text-center">
        <h4 className="text-xl font-bold">Sign Up</h4>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <Input className="border-none" type="text" placeholder="Full Name" />
        </div>
        <div className="flex flex-col gap-1">
          <Input className="border-none" type="text" placeholder="Username" />
        </div>
        <div className="flex flex-col gap-1">
          <Input className="border-none" type="email" placeholder="Email" />
        </div>
        <PasswordInput placeholder="Password" />
        <PasswordInput placeholder="Confirm Password" />
        <div className="flex justify-start ">
          <div className="flex gap-1">
            <span className="text-black text-sm text-right  transition-all">
              Already have an account?
            </span>
            <span
              onClick={() => router.push("/auth/login")}
              className="text-black text-sm text-right underline cursor-pointer hover:text-gray-300 transition-all"
            >
              Sign In
            </span>
          </div>
        </div>
        <div>
          <Button className="bg-black text-white w-full">Sign Up</Button>
        </div>
      </CardContent>
      {/* <CardFooter className="w-full flex flex-col justify-center mt-[-10px] gap-3">
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
      </CardFooter> */}
    </Card>
  );
};

export default Register;
