import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { UserProperties } from "./User.type";

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
  dataUser?: UserProperties;
}

interface SessionExtend extends Session {
  accessToken?: string;
  dataUser?: UserProperties;
}

interface JWTExtend extends JWT {
  user?: UserExtend;
  expiresAt?: number;
}

export type {
  IRegister,
  IActivation,
  JWTExtend,
  SessionExtend,
  UserExtend,
  ILogin,
};
