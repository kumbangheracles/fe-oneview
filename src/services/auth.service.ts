import oneAxios from "@/lib/axios/oneAxios";
import { IActivation, ILogin, IRegister } from "@/types/Auth";
import { UserProperties } from "@/types/User.type";

const authServices = {
  register: (payload: UserProperties) =>
    oneAxios.post(`/auth/register`, payload),

  activation: (payload: IActivation) =>
    oneAxios.post(`/auth/activation`, payload),
  login: (payload: ILogin) => oneAxios.post(`/auth/login`, payload),
  getProfileWithToken: (token: string) =>
    oneAxios.get(`/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  loginWithGoogle: (accessToken: string) =>
    oneAxios.get("/auth/login-with-google", {
      headers: { Authorization: `Bearer ${accessToken}` },
    }),
};

export default authServices;
