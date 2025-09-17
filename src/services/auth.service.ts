import oneAxios from "@/lib/axios/oneAxios";
import { IActivation, ILogin, IRegister } from "@/types/Auth";

const authServices = {
  register: (payload: IRegister) => oneAxios.post(`/auth/register`, payload),

  activation: (payload: IActivation) =>
    oneAxios.post(`/auth/activation`, payload),
  login: (payload: ILogin) => oneAxios.post(`/auth/login`, payload),
  getProfileWithToken: (token: string) =>
    oneAxios.get(`/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export default authServices;
