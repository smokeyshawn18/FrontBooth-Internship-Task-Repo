import axios from "axios";

export const apiInstance = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});
