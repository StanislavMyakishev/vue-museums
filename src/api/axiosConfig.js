import { default as axiosBase } from "axios";

export const axios = axiosBase.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 3000
});
