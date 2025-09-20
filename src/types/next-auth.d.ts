import { DefaultSession, DefaultUser } from "next-auth";
import { UserProperties } from "./User.type";

declare module "next-auth" {
  interface User extends DefaultUser {
    accessToken?: string;
    role?: string;
    dataUser?: UserProperties;
  }

  interface Session extends DefaultSession {
    accessToken?: string;
    user?: UserProperties;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: User & {
      accessToken?: string;
      role?: string;
      dataUser?: UserProperties;
    };
  }
}
