'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Login() {
  const [its, setIts] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('user');
  const [activeClassName, setActiveClassName] = useState(
    'px-4 py-2 border-[#1c6e04] text-[#1c6e04] mr-1'
  );
  const [inactiveClassName, setInactiveClassName] = useState(
    'px-4 py-2 bg-[#1c6e04] text-white mr-1'
  );
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setUserData(JSON.parse(user));
    } else {
      return;
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if ITS is entered
    if (!its) {
      alert('Please enter your ITS.');
      return;
    }
  
    // Make a request to check if the ITS exists
    const res = await fetch(`/api/check-its/${its}`);
    const data = await res.json();
  
    if (!data.exists) {
      // If ITS is not found, show alert message
      alert('ITS not found.');
      return;
    }
  
    // If ITS exists, proceed with login
    const loginRes = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ its, password }),
    });
  
    const loginData = await loginRes.json();
  
    if (loginData.status === 'Already logged in') {
      alert('Already logged in');
      window.location.reload();
    }
  
    if (loginRes.status === 200) {
      // If the logged-in user is an admin, but they're trying to log in from the user tab
      if (loginData.user.userRole === 'admin' && activeTab === 'user') {
        alert('Please login from admin tab');
        return;
      }
  
      // If the logged-in user is a user, but they're trying to log in from the admin tab
      if (loginData.user.userRole === 'user' && activeTab === 'admin') {
        alert('Please login from user tab');
        return;
      }
  
      localStorage.setItem('user', JSON.stringify(loginData.user));
  
      if (loginData.user.userRole === 'user') {
        window.location.href = '/screen';
      } else if (loginData.user.userRole === 'admin') {
        window.location.href = '/admin';
      }
    } else {
      setError(loginData.error);
    }
  };
  

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="relative flex place-items-center z-[-1]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
          src="/ITS_Logo_Golden.png"
          alt="App Logo"
          width={180}
          height={37}
          priority
        />
      </div>
      <div className="mt-8">
        <button
          onClick={() => setActiveTab('user')}
          className={activeTab === 'user' ? activeClassName : inactiveClassName}
        >
          User
        </button>
        <button
          onClick={() => setActiveTab('admin')}
          className={
            activeTab === 'admin' ? activeClassName : inactiveClassName
          }
        >
          Admin
        </button>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col mt-8">
        <label htmlFor="its" className="mb-2">
          Enter ITS:
        </label>
        <input
          type="number"
          id="its"
          value={its}
          onChange={(e) => setIts(e.target.value)}
          required
          className="mb-4 px-3 py-2 border border-gray-300"
        />
        {activeTab === 'admin' && (
          <>
            <label htmlFor="password" className="mb-2">
              Enter Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mb-4 px-3 py-2 border border-gray-300"
            />
          </>
        )}
        <button type="submit" className="px-4 py-2 bg-[#1c6e04] text-white">
          View Waaz
        </button>
      </form>
    </main>
  );
}
