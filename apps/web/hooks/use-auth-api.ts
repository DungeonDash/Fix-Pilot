"use client";

import { useAuth } from "@clerk/nextjs";
import { AxiosInstance } from "axios";

import { api } from "@/lib/api";

export function useAuthApi() {
  const { getToken } = useAuth();

  async function request(): Promise<AxiosInstance> {
    const token = await getToken();

    const instance = api.create({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return instance;
  }

  return {
    request,
  };
}