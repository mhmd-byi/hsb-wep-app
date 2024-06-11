"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push('/');
        return;
      }
  
      try {
        const decodedToken = jwtDecode(token);
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: decodedToken._id })
        });
  
        if (!response.ok) {
          throw new Error('Authentication failed');
        }
  
        const data = await response.json();
        if (!data.userExists) {
          throw new Error('User not found');
        }
  
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Authentication error:', error);
        router.push('/');
      }
    };
  
    checkAuthentication();
  }, [router]); // Only re-run the effect if `router` changes
  

  if (!isAuthenticated) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
