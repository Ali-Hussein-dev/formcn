import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const convertToKababCase = (str: string) =>
  str.replace(/ /g, "-").toLowerCase();
