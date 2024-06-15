"use client";
import { Modal } from "@/components/Modal";
import { useState, useEffect } from "react";
import Fuse from "fuse.js";
import { Delete, ExpandLess, ExpandMore, PersonAdd, Edit } from "@mui/icons-material";
import { Toaster } from "react-hot-toast";
import { Loader } from "@/components/loader";
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useDashboard } from "./useDashboard";

export default function Dashboard() {

  const {
    handleRoleSelection,
    handleBatchSelection,
    getUniqueBatches,
    fetchUsers,
    isLoading,
    getSubscriptionEndDate,
    handleDelete,
    dashboardState,
    setDashboardState,
    users,
  } = useDashboard();

  const renderDropdownOptions = () => {
    const uniqueBatches = getUniqueBatches();
    const uniqueRoles = [...new Set(users.map((user) => user.role))];

    return dashboardState.showDropdown ? (
      <div className="py-2">
        <li
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => {
            setDashboardState({
              ...dashboardState,
              showBatchDropdown: !dashboardState.showBatchDropdown
            })
          }}
        >
          <div className="flex justify-between items-center">
            <span>Batch</span>
            {dashboardState.showBatchDropdown ? <ExpandLess /> : <ExpandMore />}
          </div>
          {dashboardState.showBatchDropdown && (
            <div className="max-h-48 overflow-y-scroll">
              {uniqueBatches.map((batch) => (
                <div key={batch} className="ps-4">
                  <input
                    id={`batch-${batch}`}
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    checked={dashboardState.selectedBatches.includes(batch)}
                    onChange={() => handleBatchSelection(batch)}
                  />
                  <label
                    htmlFor={`batch-${batch}`}
                    className="w-full py-1 ms-2 text-sm font-medium text-gray-900"
                  >
                    {batch}
                  </label>
                </div>
              ))}
            </div>
          )}
        </li>
        <li
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => {
            setDashboardState({
              ...dashboardState,
              showRoleDropdown: !dashboardState.showRoleDropdown,
            })
          }}
        >
          <div className="flex justify-between items-center">
            <span>Role</span>
            {dashboardState.showRoleDropdown ? <ExpandLess /> : <ExpandMore />}
          </div>
          {dashboardState.showRoleDropdown &&
            uniqueRoles.map((role) => (
              <div key={role} className="ps-4">
                <input
                  id={`role-${role}`}
                  type="radio"
                  value={role}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  checked={dashboardState.selectedRole === role}
                  onChange={() => handleRoleSelection(role)}
                />
                <label
                  htmlFor={`role-${role}`}
                  className="w-full py-1 ms-2 text-sm font-medium text-gray-900"
                >
                  {role}
                </label>
              </div>
            ))}
        </li>
      </div>
    ) : null;
  };

  useEffect(() => {
    fetchUsers();
    getSubscriptionEndDate(30406688);
  }, [dashboardState.showModal]);

  const fuseOptions = {
    keys: ["name"],
    includeScore: true,
    threshold: 0.3,
  };

  const fuse = new Fuse(users, fuseOptions);

  const sortUsers = (a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    if (nameA < nameB) {
      return dashboardState.sortOrder === 'asc' ? -1 : 1;
    }
    if (nameA > nameB) {
      return dashboardState.sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  };
  const sortedUsers = [...users].sort(sortUsers);

  const filteredUsers = dashboardState.searchTerm
  ? sortedUsers.filter(
      (user) =>
        (dashboardState.selectedBatches.length === 0 || dashboardState.selectedBatches.includes(user.batch)) &&
        (dashboardState.selectedRole === '' || user.role === dashboardState.selectedRole) &&
        (user.its.toString().includes(searchTerm) ||
          fuse
            .search(searchTerm)
            .map((result) => result.item)
            .includes(user))
    )
  : sortedUsers.filter(
      (user) =>
        (dashboardState.selectedBatches.length === 0 || dashboardState.selectedBatches.includes(user.batch)) &&
        (dashboardState.selectedRole === '' || user.role === dashboardState.selectedRole)
    );
  const toggleDropdown = () => {
    setDashboardState({
      ...dashboardState,
      showDropdown: !dashboardState.showDropdown,
    })
  };

  return (
    <div className="relative h-full flex flex-col">
    {isLoading && <Loader />}
      {dashboardState.showModal && (
        <Modal
          open={dashboardState.showModal}
          setOpen={(isOpen) => setDashboardState(prevState => ({ ...prevState, showModal: isOpen }))}
          userToEdit={dashboardState.userToEdit}
        />
      )}
      <div className="flex justify-between items-center w-full px-6 my-7 sticky top-0 bg-white py-4 shadow-md">
        <div>
          <h1 className="text-2xl font-bold bg-[#EFF3FA] p-2 rounded-lg text-theme-color">
            HSB Members List
          </h1>
        </div>
        <div className="flex gap-10 justify-end items-center">
          <form class="mx-auto">
            <div class="flex">
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="w-40 z-10 inline-flex justify-between items-center py-2.5 px-4 text-sm font-medium text-center text-white bg-theme-color border border-theme-color rounded-lg rounded-r-none hover:bg-theme-color"
                  type="button"
                >
                  <span>All categories</span>
                  <KeyboardArrowDownIcon />
                </button>
                {dashboardState.showDropdown && (
                  <div
                    id="dropdown"
                    class="w-full absolute z-10 bg-theme-color divide-y divide-gray-100 rounded-lg shadow"
                  >
                    <ul
                      class="py-2 text-sm text-gray-70 bg-gray-200"
                      aria-labelledby="dropdown-button"
                    >
                      {renderDropdownOptions()}
                    </ul>
                  </div>
                )}
              </div>
              <div class="relative w-full">
                <input
                  type="search"
                  id="search-dropdown"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  class="block p-2.5 w-56 z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300"
                  placeholder="Search ITS, Name . . ."
                  required
                />
                <button
                  type="submit"
                  class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-theme-color rounded-e-lg border focus:ring-4 focus:outline-none"
                >
                  <SearchIcon />
                  <span class="sr-only">Search</span>
                </button>
              </div>
            </div>
          </form>

          <div>
            <span
              onClick={() => {
                setDashboardState({
                  ...dashboardState,
                  userToEdit: null,
                  showModal: true,
                })
              }}
              className="bg-theme-color p-3 rounded cursor-pointer border-theme-color border-2 hover:bg-transparent group"
            >
              <PersonAdd className="text-white group-hover:text-theme-color" />
            </span>
          </div>
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
          {filteredUsers.map((user) => (
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
                {dashboardState.subscriptionEndDate?.split("T")[0] || "-"}
              </td>
              <td className="px-6 py-4 flex gap-2">
                <Edit
                  className="text-theme-color cursor-pointer"
                  onClick={() => {
                    setDashboardState({
                      ...dashboardState,
                      userToEdit: user,
                      showModal: true,
                    })
                  }}
                />
                <Delete
                  onClick={() => handleDelete(user.its)}
                  className="text-[#ff1a1a] cursor-pointer"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Toaster />
    </div>
  );
}
