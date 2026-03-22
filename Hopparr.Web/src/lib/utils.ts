import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function apiBaseUrl() {
  if (process.env.NODE_ENV === "production") {
    return "/api/";
  } else {
    return "http://localhost:5168/api/";
  }
}