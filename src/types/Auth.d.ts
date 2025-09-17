import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

interface IRegister {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ILogin {
  identifier: string;
  password: string;
}

interface IActivation {
  code: string;
}

interface UserExtend extends User {
  accessToken?: string;
  role?: string;
}

interface SessionExtend extends Session {
  accessToken?: string;
}

interface JWTExtend extends JWT {
  user?: UserExtend;
}

export type {
  IRegister,
  IActivation,
  JWTExtend,
  SessionExtend,
  UserExtend,
  ILogin,
};
