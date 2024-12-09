"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { ReactNode, createContext, useState } from "react";

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
}

interface UserContextType {
  //   register: (user: User) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  login: (user: User) => void;
  register: (user: User) => void;
}

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  //   async function register(user: User) {}

  async function login(user: User) {
    setLoading(true);
    const result = await axios.post("http://localhost:3000/api/user/login", {
      email: user.email,
      password: user.password,
    });
    if (result) {
      console.log(result);
      localStorage.setItem("token", result.data.data.token);
      router.push("/products");
    }
  }

  async function register(user: User) {
    setLoading(true);
    const result = await axios.post("http://localhost:3000/api/user/register", {
      email: user.email,
      password: user.password,
      name: user.name,
    });
    if (result) {
      router.push("/login");
    }
  }

  return (
    <UserContext.Provider
      value={{
        loading,
        setLoading,
        login,
        register,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
