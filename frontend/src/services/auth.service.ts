import type { LoginRequest, LoginResponse, User } from "../types/auth";

import { api } from "./api";

export const login = async (
  credentials: LoginRequest,
): Promise<LoginResponse> => {
  const response = await fetch(`${api.baseUrl}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.request("/users/me");

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to get current user"
    );
  }

  return data.user;
};