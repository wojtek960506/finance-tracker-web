"use client"

export const useLocalStorage = (key: string) => {

  const getL = () => {
    return localStorage.getItem(key);
  }

  const setL = (value: string) => {
    localStorage.setItem(key, value);
  }

  const removeL = () => {
    localStorage.removeItem(key);
  }

  return { getL, setL, removeL }
}