import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const areObjectsEqual = (
    obj1: Record<string, unknown>,
    obj2: Record<string, unknown>
  ) => {
    const map1 = new Map(Object.entries(obj1));
    const map2 = new Map(Object.entries(obj2));

    if (map1.size !== map2.size) return false;

    for (const [key, value] of map1) {
      if (map2.get(key) !== value) return false;
    }
    return true;
  }
