import environtment from "@/config/environtment";
import crypto from "crypto";
export const encrypt = (password: string) => {
  const encrypted = crypto
    .pbkdf2Sync(
      password,
      environtment.AUTH_SECRET as string,
      1000,
      64,
      "sha512"
    )
    .toString("hex");
  return encrypted;
};
