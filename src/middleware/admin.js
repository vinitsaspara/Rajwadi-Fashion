import { authMiddleware } from "./auth";

export async function adminMiddleware() {
  const user = await authMiddleware();

  if (user.role !== "ADMIN") {
    throw new Error("Forbidden");
  }

  return user;
}