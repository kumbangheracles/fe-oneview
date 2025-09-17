import environtment from "@/config/environtment";
import { SessionExtend } from "@/types/Auth";
import axios from "axios";
import { getSession } from "next-auth/react";

const headers = {
  "Content-Type": "application/json",
};

const oneAxios = axios.create({
  baseURL: environtment.API_URL,
  headers,
  timeout: 60 * 1000,
});

oneAxios.interceptors.request.use(
  async (request) => {
    const session: SessionExtend | null = await getSession();
    if (session && session.accessToken) {
      request.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return request;
  },
  (error) => Promise.reject(error)
);

oneAxios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default oneAxios;
