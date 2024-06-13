"use client";
import { Modal } from "@/components/Modal";
import { useState, useEffect } from "react";
import Fuse from "fuse.js";

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [subscriptionEndDate, setSubscriptionEndDate] = useState();

  const fetchUsers = async () => {
    const response = await fetch("/api/users");
    const data = await response.json();
    setUsers(data);
  };

  const getSubscriptionEndDate = async (its) => {
    const response = await fetch(`/api/fetch-user-subscription/${its}`);
    const data = await response.json();
    setSubscriptionEndDate(data.endDate);
  };

  useEffect(() => {
    fetchUsers();
    getSubscriptionEndDate(30406688);
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

        setUsers(users.filter((user) => user.its !== its));
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

    const fuseOptions = {
      keys: ["name"],
      includeScore: true,
      threshold: 0.3 
    };
  
    const fuse = new Fuse(users, fuseOptions);
  
    const filteredUsers = searchTerm ? (
      users.filter(user =>
        user.its.toString().includes(searchTerm) || 
        fuse.search(searchTerm).map(result => result.item).includes(user) 
      )
    ) : users;
    const sortedUsers = filteredUsers.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="relative h-full flex flex-col">
      {showModal && <Modal open={showModal} setOpen={setShowModal} />}
      <div className="flex justify-between items-center w-full px-10 my-7 sticky top-0 bg-white py-4 shadow-md">
        <div>
          <h1 className="text-4xl font-bold text-theme-color">
            HSB Members List
          </h1>
        </div>
        <label
          className="relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 focus-within:border-gray-300"
          for="search-bar"
        >
          <input
            id="search-bar"
            placeholder="your keyword here"
            className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="w-full md:w-auto px-6 py-3 bg-black border-black text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all disabled:opacity-70">
            <div className="relative">
              <div className="flex items-center justify-center h-3 w-3 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transition-all">
                <svg
                  className="opacity-0 animate-spin w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>

              <div className="flex items-center transition-all opacity-1 valid:">
                <span className="text-sm font-semibold whitespace-nowrap truncate mx-auto">
                  Search
                </span>
              </div>
            </div>
          </button>
        </label>
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
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Subscription End Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedUsers.map((user) => (
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">{user.its}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.batch}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.role === "admin"
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {user.role}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {subscriptionEndDate?.split("T")[0] || "-"}
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
  );
}
