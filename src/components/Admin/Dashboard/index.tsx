"use client";
import AppLayout from "@/components/AppLayout";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";

const AdminDashboard = () => {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <Card className="w-[90%] h-[80%] base-sky-bg shadow-xl">
        <CardHeader className="flex items-center flex-col gap-4 justify-center">
          <div className="flex w-[100px] h-[100px] rounded-full border-2 border-sky-50 justify-center items-center overflow-hidden">
            <Avatar className="w-full h-full">
              <AvatarImage src={"/bg-img/bg-sky.jpeg"} />
            </Avatar>
          </div>
          <h4 className="underline-custom text-xl font-bold">
            Ahmad Herkal Taqyudin
          </h4>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default AdminDashboard;
