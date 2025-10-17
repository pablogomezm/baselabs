import { HttpStatus } from "@/constants/http-status";
import { API_BASE_URL } from "@/config/config";

export async function buyCorn() {
  const response = await fetch(`${API_BASE_URL}/buy-corn`, {
    method: "POST",
  });

  if (!response.ok) {
    if (response.status === HttpStatus.TOO_MANY_REQUESTS) {
      throw new Error("Too many requests, wait 1 minute 3");
    }
    throw new Error("Unexpected error");
  }

  return response.json();
}
