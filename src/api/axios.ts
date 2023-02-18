import Axios from "axios";

const token = localStorage.getItem("token");

export const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: token ? `Bearer ${token}` : undefined,
  },
});

window.addEventListener("storage", () => {
  const token = localStorage.getItem("token");

  if (token) axios.defaults.headers.Authorization = `Bearer ${token}`;
  else delete axios.defaults.headers.Authorization;
});
