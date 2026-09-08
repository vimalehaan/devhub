import { authStorage } from "./auth.storage";

const API_BASE_URL = "http://localhost:3000/api";

export const api = {
  baseUrl: API_BASE_URL,

  async request(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<Response> {
    const token = authStorage.getToken();

    const headers = new Headers(options.headers);

    headers.set("Content-Type", "application/json");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });
  },
};