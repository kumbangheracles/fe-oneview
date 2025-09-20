import UploadProfileImgPage from "@/components/UploadProfileImage";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Upload Profile Image",
  description: "This is dashboard for upload profile image",
};

const UploadProfileImage = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <UploadProfileImgPage />
    </div>
  );
};

export default UploadProfileImage;
