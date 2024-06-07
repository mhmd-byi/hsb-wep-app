'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {jwtDecode} from 'jwt-decode';

const ProtectedRoute = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !router.isReady) return;

    const token = localStorage.getItem("token") || "";

    if (!token) {
      console.log("No token found, redirecting...");
      router.push('/');
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      if (!decodedToken) {
        console.error('Invalid token or token has expired');
        router.push('/');
        return;
      }

      fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: decodedToken._id })
      })
      .then(response => response.json())
      .then(data => {
        if (!data.userExists) {
          console.log('User not found in the database, redirecting...');
          router.push('/');
        }
      })
      .catch(error => {
        console.error('Failed to verify user:', error);
        router.push('/');
      });

    } catch (error) {
      console.error('Error decoding token:', error);
      router.push('/');
    }
  }, [router, isMounted]);

  return children;
};

export default ProtectedRoute;