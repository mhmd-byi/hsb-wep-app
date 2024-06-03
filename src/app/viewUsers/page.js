'use client';
import { useEffect, useState } from 'react';

export default function ViewUsers() {
  const [userData, setUserData] = useState(null);
  const [users, setUsers] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user && JSON.parse(user).userRole === 'admin') {
      setUserData(JSON.parse(user));
    } else {
      window.location.href = '/';
    }
  }, []);

  useEffect(async () => {
    const res = await fetch('/api/users');
    const data = await res.json();
    console.log(data);
    setUsers(data);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          its: userData?.its,
        }),
      });
      if (!response.ok) throw new Error('Logout failed');
      localStorage.removeItem('user');
      window.location.href = '/';
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const handleDelete = async (its) => {
    try {
      console.log('this is its fe', its);
      const response = await fetch(`/api/delete-user/${its}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Deletion failed');

      // Remove the user from the users state
      setUsers(users.filter((user) => user.its !== its));
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 bg-[#1c6e04] text-white flex justify-between">
        <h1 className="text-2xl">Goregaon Jamaat Broadcasting App</h1>
        <div className="relative inline-block">
          <div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 bg-[#edb767] text-black"
            >
              Logout
            </button>
          </div>
          {dropdownOpen && (
            <div className="absolute right-0 w-40 mt-2 py-2 bg-white border rounded shadow-xl">
              <a
                href="#"
                className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-[#1c6e04] hover:text-white"
                onClick={handleLogout}
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </header>
      <div className="flex-1 flex min-h-screen">
        <aside className="p-4 w-64 bg-[#edb767]">
          <ul className="space-y-2">
            <li>
              <a href="/admin" className="block">
                Add Users
              </a>
            </li>
            <li>
              <a href="/screen" className="block">
                Live Screen
              </a>
            </li>
            <li>
              <a href="/viewUsers" className="block">
                View Users
              </a>
            </li>
            <li>
              <a href="/youtube" className="block">
                Change URL
              </a>
            </li>
          </ul>
        </aside>
        <main className="flex-1 p-24">
          <h1 className="text-2xl mb-5">User List</h1>
          <table className="w-full text-md bg-white shadow-md rounded mb-4 overflow-hidden border-b border-gray-200">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 px-5">ITS</th>
                <th className="text-left p-3 px-5">Name</th>
                <th className="text-left p-3 px-5">Role</th>
                <th className="text-left p-3 px-5">Logged in</th>
                <th className="text-left p-3 px-5">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((oneUser) => (
                <tr key={oneUser._id} className="border-b hover:bg-gray-100">
                  <td className="p-3 px-5">{oneUser.its}</td>
                  <td className="p-3 px-5">{oneUser.name}</td>
                  <td className="p-3 px-5">{oneUser.userRole}</td>
                  <td className="p-3 px-5">
                    {oneUser.isLoggedIn ? 'Yes' : 'No'}
                  </td>
                  <td className="p-3 px-5">
                    <button
                      className="bg-orange-500 text-white px-2 py-1 rounded mr-2"
                      onClick={() => handleSessionLogout(oneUser.its)}
                    >
                      Session Logout
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleDelete(oneUser.its)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
}
