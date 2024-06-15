'use client';

import Image from "next/image";
import { Logout } from "@mui/icons-material";

export default function Header() {

  const user = localStorage.getItem('user');
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          its: user?.its,
        }),
      });
      if (!response.ok) throw new Error('Logout failed');
      localStorage.removeItem('user');
      window.location.href = '/';
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };
  
  return (
    <header className="bg-theme-color py-4 px-5 flex justify-between items-center">
      <Image src="/hsb-logo.png" width={150} height={30} alt="logo"/>
      <button className="flex text-white" onClick={handleLogout}><Logout />Logout</button>
    </header>
  );
}
