import { HttpStatus } from "@/constants/http-status";

export async function buyCorn() {
  const response = await fetch("http://localhost:3001/buy-corn", {
    method: "POST",
  });

  if (!response.ok) {
    if (response.status === HttpStatus.TOO_MANY_REQUESTS) {
      throw new Error("Too many requests, wait 1 minute");
    }
    throw new Error("Unexpected error");
  }

  return response.json();
}
