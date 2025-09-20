import { toast } from "sonner";

export const ErrorHandler = (
  error: any,
  backendMsg: string = error?.response?.data?.message || "Something went wrong"
) => {
  toast(backendMsg);
  console.log("Error from backend:", error);
};

export const validatePhoneNumber = (phoneNumber: string | null) => {
  if (!phoneNumber) {
    return "Phone number is required";
  }

  if (!/^[0-9]+$/.test(phoneNumber)) {
    return "Phone number must contain only digits";
  }

  if (phoneNumber.length !== 13) {
    return "Phone number must be exactly 13 digits";
  }

  return null;
};
