"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

import { FaEyeSlash, FaEye, FaSpinner } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import authServices from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { initialUser, UserProperties } from "@/types/User.type";
import { CustomSelect } from "@/components/CustomSelect";
import oneAxios from "@/lib/axios/oneAxios";
import { toast } from "sonner";
import { ErrorHandler, validatePhoneNumber } from "@/lib/errorHandler";
import { MdErrorOutline } from "react-icons/md";
interface PasswordInputProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  placeholder,
  value,
  onChange,
}) => {
  const [openPass, setOpenPass] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <Input
        type={openPass ? "text" : "password"}
        className="border-none text-[10px] h-[13px] sm:text-sm sm:h-[30px]"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        iconRight={openPass ? <FaEye /> : <FaEyeSlash />}
        isClickable
        iconRightOnClick={() => setOpenPass((prev) => !prev)}
      />
    </div>
  );
};

const Register = () => {
  const [dataUser, setDataUser] = useState<UserProperties>(initialUser);
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const showError = (title: string, description: string) => {
    toast(title, { description });
  };

  const handleSubmit = async (data: UserProperties) => {
    try {
      setLoading(true);

      const validateRequiredFields = (): boolean => {
        const requiredFields = [
          { value: data.fullName, name: "Full Name" },
          { value: data.username, name: "Username" },
          { value: data.email, name: "Email" },
          { value: data.password, name: "Password" },
          { value: confirmPassword, name: "Confirm Password" },
          { value: data.role, name: "Role" },
          { value: data.phoneNumber, name: "Phone Number" },
        ];
        const validationPhone = validatePhoneNumber(data.phoneNumber as string);

        if (typeof validationPhone === "string") {
          toast(validationPhone);
          return false;
        }

        const emptyFields = requiredFields.filter(
          (field) => !field.value?.trim()
        );

        if (emptyFields.length > 0) {
          if (emptyFields.length === 1) {
            showError(
              `${emptyFields[0].name} is required!`,
              "Please fill the field"
            );
          } else {
            showError(
              "All fields are required!!!",
              "Please fill the required fields"
            );
          }
          return false;
        }
        return true;
      };

      const validateEmail = (): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email as string)) {
          showError(
            "Invalid email format!",
            "Please enter a valid email address"
          );
          return false;
        }
        return true;
      };

      const validatePassword = (): boolean => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;
        if (!passwordRegex.test(data.password as string)) {
          showError(
            "Invalid password format!",
            "Password must contain at least 1 capital letter and 1 number"
          );
          return false;
        }
        return true;
      };

      const validatePasswordMatch = (): boolean => {
        if (data.password !== confirmPassword) {
          showError(
            "Passwords do not match!",
            "Please ensure both passwords are identical"
          );
          return false;
        }
        return true;
      };

      if (
        !validateRequiredFields() ||
        !validateEmail() ||
        !validatePassword() ||
        !validatePasswordMatch()
      ) {
        return;
      }

      const payload = {
        fullName: data.fullName,
        username: data.username,
        email: data.email,
        role: data.role,
        password: data.password,
        confirmPassword: confirmPassword,
        phoneNumber: data.phoneNumber,
      };

      const response = await authServices.register(payload);

      console.log("Registration response:", response);

      toast("Registration Success", {
        description: "You can login now!",
      });

      console.log("Payload: ", payload);

      setTimeout(() => {
        router.push("/auth/login");
        setLoading(false);
      }, 3000);
    } catch (error) {
      ErrorHandler(error);
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card className="base-sky-bg border shadow-md font-mono w-[450px] m-2">
      <CardHeader className="flex justify-center items-center text-center">
        <h4 className="text-sm font-bold sm:text-lg">Sign Up</h4>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <Input
            className="border-none text-[10px] h-[13px] sm:text-sm sm:h-[30px]"
            type="text"
            placeholder="Full Name"
            onChange={(e) =>
              setDataUser({
                ...dataUser,
                fullName: e.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col gap-1">
          <Input
            className="border-none text-[10px] h-[13px] sm:text-sm sm:h-[30px]"
            type="text"
            placeholder="Username"
            onChange={(e) =>
              setDataUser({
                ...dataUser,
                username: e.target.value,
              })
            }
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="w-full">
            <Input
              className="border-none text-[10px] h-[13px] sm:text-sm sm:h-[30px]"
              type="email"
              placeholder="Email"
              onChange={(e) =>
                setDataUser({
                  ...dataUser,
                  email: e.target.value,
                })
              }
            />
          </div>
          <div className="w-[40%] ">
            <CustomSelect
              triggerClassName="text-[10px] cursor-pointer h-[13px] sm:text-sm sm:h-auto"
              contentClassName="text-xs"
              placeholder="Role"
              options={[
                {
                  value: "admin",
                  label: "Admin",
                },
                {
                  value: "user",
                  label: "User",
                },
              ]}
              value={dataUser.role}
              onChange={(option: string) =>
                setDataUser({
                  ...dataUser,
                  role: option,
                })
              }
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Input
            className="border-none text-[10px] h-[13px] sm:text-sm sm:h-[30px]"
            type="text"
            placeholder="Phone Number"
            onChange={(e) =>
              setDataUser({
                ...dataUser,
                phoneNumber: e.target.value,
              })
            }
          />
        </div>
        <PasswordInput
          placeholder="Password"
          value={dataUser.password || ""}
          onChange={(e) =>
            setDataUser({
              ...dataUser,
              password: e.target.value,
            })
          }
        />

        <PasswordInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button
          className="bg-black text-white w-full h-[25px] text-[10px] sm:text-sm sm:h-auto"
          onClick={() => handleSubmit(dataUser)}
          disabled={loading ? true : false}
        >
          {loading ? <FaSpinner /> : "   Sign Up"}
        </Button>

        <div className="flex gap-1 justify-center">
          <span className="text-black text-[10px] sm:text-sm text-right  transition-all">
            Already have an account?
          </span>
          <span
            onClick={() => router.push("/auth/login")}
            className="text-black  text-[10px] sm:text-sm  text-right underline cursor-pointer hover:text-gray-300 transition-all "
          >
            Sign In
          </span>
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
