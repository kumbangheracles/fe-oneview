import { toast } from "sonner";

export const ErrorHandler = (error: unknown) => {
  let message = "Something went wrong";

  if (error instanceof Error) {
    message = error.message;
  } else if (
    typeof error === "object" &&
    error !== null &&
    "response" in error
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    message = (error as any).response?.data?.message || message;
  }

  toast(message);
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
