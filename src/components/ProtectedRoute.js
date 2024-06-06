'use client';

import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  let token = '';
  let decodedToken = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token") || "";
  }

  if (token) {
    try {
      decodedToken = jwtDecode(token);
      if (!decodedToken) {
        console.error('Invalid token or token has expired');
        router.push('/');
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      router.push('/');
    }
  } else {
    router.push('/');
  }

  return decodedToken ? children : null;
};