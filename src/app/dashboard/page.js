"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import Image from "next/image";
import { Modal } from "@/components/Modal";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  console.log('this is users', users)

  const fetchUsers = async () => {
    const response = await fetch("/api/users");
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, [showModal]);

  const handleDelete = async (its) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this user?"
      );
      if (confirmDelete) {
        const response = await fetch(`/api/delete-user/${its}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Deletion failed");

        // Remove the user from the users state
        setUsers(users.filter((user) => user.its !== its));
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <ProtectedRoute>
      <header className="bg-theme-color py-4 flex justify-center">
        <Image src="/hsb-logo.png" width={150} height={30} />
      </header>
      <div className="h-full w-screen flex flex-col justify-center items-center">
        {showModal && <Modal open={showModal} setOpen={setShowModal} />}
        <div className="flex justify-between w-full px-10 my-7">
          <div>
            <h1>HSB Members</h1>
          </div>
          <div>
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
            >
              Add User
            </button>
          </div>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ITS Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Batch
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Profile Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">{user.its}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.batch}</td>
                <td className="px-6 py-4 whitespace-nowrap">profileImage</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleDelete(user.its)}
                    className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
                  >
                    Delete User
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ProtectedRoute>
  );
}
