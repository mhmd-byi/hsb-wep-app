"use client";
import { Modal } from "@/components/Modal";
import { Delete, ExpandLess, ExpandMore, PersonAdd } from "@mui/icons-material";
import { useUsersTable } from "./hook/useUserManagement";

export default function Dashboard() {
  const {
    userToEdit,
    setUserToEdit,
    users,
    setSearchTerm,
    subscriptionEndDate,
    showDropdown,
    setShowDropdown,
    showBatchDropdown,
    setShowBatchDropdown,
    selectedBatches,
    selectedRole,
    showRoleDropdown,
    setShowRoleDropdown,
    handleRoleSelection,
    handleBatchSelection,
    getUniqueBatches,
    handleDelete,
    showModal,
    setShowModal,
    filteredUsers,
  } = useUsersTable();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const renderDropdownOptions = () => {
    const uniqueBatches = getUniqueBatches();
    const uniqueRoles = [...new Set(users.map((user) => user.role))];

    return showDropdown ? (
      <div className="py-2">
        <li
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => setShowBatchDropdown(!showBatchDropdown)}
        >
          <div className="flex justify-between items-center">
            <span>Batch</span>
            {showBatchDropdown ? <ExpandLess /> : <ExpandMore />}
          </div>
          {showBatchDropdown && (
            <div className="max-h-48 overflow-y-scroll">
              {uniqueBatches.map((batch) => (
                <div key={batch} className="ps-4">
                  <input
                    id={`batch-${batch}`}
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    checked={selectedBatches.includes(batch)}
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
          onClick={() => setShowRoleDropdown(!showRoleDropdown)}
        >
          <div className="flex justify-between items-center">
            <span>Role</span>
            {showRoleDropdown ? <ExpandLess /> : <ExpandMore />}
          </div>
          {showRoleDropdown &&
            uniqueRoles.map((role) => (
              <div key={role} className="ps-4">
                <input
                  id={`role-${role}`}
                  type="radio"
                  value={role}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  checked={selectedRole === role}
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

  return (
    <div className="relative h-full flex flex-col">
      {showModal && (
        <Modal
          open={showModal}
          setOpen={setShowModal}
          userToEdit={userToEdit}
          setUserToEdit={setUserToEdit}
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
                  <svg
                    className="w-2.5 h-2.5 ml-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                {showDropdown && (
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
                  <svg
                    class="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20
                    20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                  <span class="sr-only">Search</span>
                </button>
              </div>
            </div>
          </form>

          <div>
            <span
              onClick={() => setShowModal(true)}
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
                {subscriptionEndDate?.split("T")[0] || "-"}
              </td>
              <td className="px-6 py-4 flex gap-2">
                <PersonAdd
                  className="text-theme-color cursor-pointer"
                  onClick={() => {
                    setUserToEdit(user);
                    setShowModal(true);
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
    </div>
  );
}
