import { useState } from "react";

export const useDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const [dashboardState, setDashboardState] = useState({
    userToEdit: null,
    showModal: false,
    searchTerm: '',
    subscriptionEndDate: '',
    showDropdown: false,
    showBatchDropdown: false,
    selectedBatches: [],
    selectedRole: '',
    showRoleDropdown: false,
    sortOrder: 'asc',
  })
  const handleRoleSelection = (role) => {
    setDashboardState({
      ...dashboardState,
      selectedRole: role,
    })
  };

  const handleBatchSelection = (batch) => {
    if (dashboardState.selectedBatches.includes(batch)) {
      setDashboardState({
        ...dashboardState,
        selectedBatches: dashboardState.selectedBatches.filter((b) => b !== batch),
      })
    } else {
      setDashboardState({
        ...dashboardState,
        selectedBatches: [...dashboardState.selectedBatches, batch],
      })
    }
  };

  const getUniqueBatches = () => {
    const batches = new Set(users.map((user) => user.batch));
    return Array.from(batches).sort((a, b) => b - a);
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    const response = await fetch("/api/users");
    const data = await response.json();
    setUsers(data);
    setIsLoading(false)
  };

  const getSubscriptionEndDate = async (its) => {
    const response = await fetch(`/api/fetch-user-subscription/${its}`);
    const data = await response.json();
    setDashboardState({
      ...dashboardState,
      subscriptionEndDate: data.endDate,
    });
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

  return {
    handleRoleSelection,
    handleBatchSelection,
    getUniqueBatches,
    fetchUsers,
    isLoading,
    setIsLoading,
    getSubscriptionEndDate,
    handleDelete,
    dashboardState,
    setDashboardState,
    users,
    setUsers,
  }
}