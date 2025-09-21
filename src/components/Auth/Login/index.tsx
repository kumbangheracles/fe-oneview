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
import { FaEyeSlash, FaEye, FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { CustomIcon } from "@/components/ui/icon";
import googleIcon from "../../../assets/icons/google.svg";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "sonner";
import { ILogin } from "@/types/Auth";
import { ErrorHandler } from "@/lib/errorHandler";
import authServices from "@/services/auth.service";
import environtment from "@/config/environtment";

const Login = () => {
  const [openPass, setOpenPass] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(false);
  const [dataUser, setDataUser] = useState<ILogin>({
    identifier: "",
    password: "",
  });
  const router = useRouter();
  const session = useSession();

  const showError = (title: string, description: string) => {
    toast(title, { description });
  };
  const handleSubmit = async (data: ILogin) => {
    try {
      setLoading(true);

      if (!data.identifier) {
        showError(
          "Identifier are required ! ! !",
          "Please fill the required fields"
        );

        return;
      }

      if (!data.password) {
        showError(
          "Password are required ! ! !",
          "Please fill the required fields"
        );

        return;
      }

      const payload = {
        identifier: data.identifier,
        password: data.password,
      };

      const response = await signIn("credentials", {
        ...payload,
        redirect: false,
      });

      // showError("Login Success", "Welcome to my web");
      setTimeout(() => {
        router.push("/login-success");

        setLoading(false);
      }, 1000);
    } catch (error) {
      ErrorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  console.log("URL: ", environtment.API_URL);

  return (
    <Card className="base-sky-bg border shadow-md font-mono w-[450px] sm:p-4 m-2">
      <CardHeader className="flex flex-col justify-center items-center text-center">
        <h4 className="text-sm font-bold sm:text-xl">
          Sign in with Email or Username
        </h4>
      </CardHeader>

      <CardContent className="flex flex-col gap-3 text-sm">
        <div className="flex flex-col ">
          <Input
            iconLeft={<MdEmail />}
            className="border-none text-[10px] h-[13px] sm:text-sm sm:h-[30px]"
            type="email"
            aria-label="Email or Username"
            placeholder="Email or Username"
            onChange={(e) =>
              setDataUser({
                ...dataUser,
                identifier: e.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col ">
          <Input
            iconLeft={<RiLock2Fill />}
            type={openPass ? "text" : "password"}
            className="border-none text-[10px] h-[13px] sm:text-sm sm:h-[30px]"
            aria-label="Password"
            iconRight={openPass ? <FaEye /> : <FaEyeSlash />}
            isClickable={true}
            placeholder="Password"
            iconRightOnClick={() => setOpenPass((prev) => !prev)}
            onChange={(e) =>
              setDataUser({
                ...dataUser,
                password: e.target.value,
              })
            }
          />
        </div>
        <div className="flex justify-between ">
          <div className="flex gap-1">
            <span className="text-black text-[7px] sm:text-sm text-right transition-all">
              Don't have account?
            </span>
            <span
              onClick={() => router.push("/auth/register")}
              className="text-black text-[7px] sm:text-sm text-right underline cursor-pointer hover:text-gray-300 transition-all"
            >
              Sign Up
            </span>
          </div>
          <span className="text-black text-[7px] sm:text-sm text-right cursor-pointer hover:text-gray-300 transition-all">
            Forgot password?
          </span>
        </div>
        <div className="flex justify-center w-full items-center gap-2 sm:flex-col">
          <Button
            className="bg-black text-white w-full h-[20px] text-[7px] sm:text-sm sm:h-auto"
            onClick={() => handleSubmit(dataUser)}
            disabled={loading ? true : false}
          >
            {loading ? <ImSpinner2 /> : "Sign In"}
          </Button>
          <Card
            className={`w-full flex items-center gap-3 justify-center cursor-pointer rounded-md hover:bg-sky-300 transition-all p-1 select-none shadow-md text-[7px] h-[20px] sm:h-auto sm:text-sm`}
            onClick={() =>
              window.open(`${environtment.API_URL}/auth/google`, "_self")
            }
          >
            {/* <CustomIcon iconSrc={googleIcon} className="w-[7px] h-[7px]" /> */}
            <FaGoogle className="text-[7px] sm:text-[17px]" />
            <span>Sign In With Google</span>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default Login;
