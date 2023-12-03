import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const PROJECT_NAME = "CampusConnect"

//  const baseUrl = `http://localhost:4000`
 const baseUrl = `https://campus-connect-one.vercel.app`

export {
  baseUrl,
  PROJECT_NAME
}