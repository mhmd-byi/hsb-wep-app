import { useState, useEffect } from "react";
import Fuse from "fuse.js";

export const useUsersTable = () => {
  const [userToEdit, setUserToEdit] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [subscriptionEndDate, setSubscriptionEndDate] = useState(null);
  const [filters, setFilters] = useState({
    showDropdown: false,
    showBatchDropdown: false,
    selectedBatches: [],
    selectedRole: "",
    showRoleDropdown: false,
    sortOrder: "asc",
  });
  const [showModal, setShowModal] = useState(false);

  const {
    showDropdown,
    showBatchDropdown,
    selectedBatches,
    selectedRole,
    showRoleDropdown,
    sortOrder,
  } = filters;

  const handleRoleSelection = (role) => {
    setFilters((prevFilters) => ({ ...prevFilters, selectedRole: role }));
  };

  const handleBatchSelection = (batch) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      selectedBatches: prevFilters.selectedBatches.includes(batch)
        ? prevFilters.selectedBatches.filter((b) => b !== batch)
        : [...prevFilters.selectedBatches, batch],
    }));
  };

  const getUniqueBatches = () => {
    const batches = new Set(users.map((user) => user.batch));
    return Array.from(batches).sort((a, b) => b - a);
  };

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

  const sortUsers = (a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    if (nameA < nameB) {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (nameA > nameB) {
      return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  };

  const fuseOptions = {
    keys: ["name"],
    includeScore: true,
    threshold: 0.3,
  };

  const fuse = new Fuse(users, fuseOptions);

  const sortedUsers = [...users].sort(sortUsers);

  const filteredUsers = searchTerm
    ? sortedUsers.filter(
        (user) =>
          (selectedBatches.length === 0 ||
            selectedBatches.includes(user.batch)) &&
          (selectedRole === "" || user.role === selectedRole) &&
          (user.its.toString().includes(searchTerm) ||
            fuse
              .search(searchTerm)
              .map((result) => result.item)
              .includes(user))
      )
    : sortedUsers.filter(
        (user) =>
          (selectedBatches.length === 0 ||
            selectedBatches.includes(user.batch)) &&
          (selectedRole === "" || user.role === selectedRole)
      );

  useEffect(() => {
    fetchUsers();
    getSubscriptionEndDate(30406688);
  }, [showModal]);

  return {
    userToEdit,
    setUserToEdit,
    users: filteredUsers,
    searchTerm,
    setSearchTerm,
    subscriptionEndDate,
    filters,
    setFilters,
    handleRoleSelection,
    handleBatchSelection,
    getUniqueBatches,
    handleDelete,
    showModal,
    setShowModal,
    filteredUsers,
  };
};
