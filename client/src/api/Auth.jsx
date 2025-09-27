

import API from "./api";

export const signupUser = async (data) => {
  const res = await API.post("/auth/signup", {
    fullName: data.name,
    email: data.email,
    password: data.password,
  });
  return res.data;
};

export const loginUser = async (data) => {
  const res = await API.post("/auth/login", {
    email: data.email,
    password: data.password,
  });
  return res.data;
};
