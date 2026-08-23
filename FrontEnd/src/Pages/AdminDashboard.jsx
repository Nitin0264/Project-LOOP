import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAdmins: 0,
    totalManagers: 0,
    totalMembers: 0,
    totalFeedback: 0,
    positiveFeedback: 0,
    negativeFeedback: 0,
    neutralFeedback: 0,
  });

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [actionLoading, setActionLoading] = useState("");

  // =====================================================
  // FETCH ADMIN DATA
  // =====================================================

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      setError("");

      const [statsResponse, usersResponse] =
        await Promise.all([
          api("/admin/stats"),
          api("/admin/users"),
        ]);

      console.log("Admin stats:", statsResponse);
      console.log("Admin users:", usersResponse);

      // -------------------------------------------------
      // AUTHORIZATION ERROR
      // -------------------------------------------------

      if (
        statsResponse.status === 401 ||
        statsResponse.status === 403 ||
        usersResponse.status === 401 ||
        usersResponse.status === 403
      ) {
        setError(
          "You do not have permission to access the admin panel."
        );

        return;
      }

      // -------------------------------------------------
      // STATS ERROR
      // -------------------------------------------------

      if (
        !statsResponse.ok ||
        !statsResponse.success
      ) {
        throw new Error(
          statsResponse.message ||
            "Unable to load admin statistics."
        );
      }

      // -------------------------------------------------
      // USERS ERROR
      // -------------------------------------------------

      if (
        !usersResponse.ok ||
        !usersResponse.success
      ) {
        throw new Error(
          usersResponse.message ||
            "Unable to load users."
        );
      }

      // -------------------------------------------------
      // SAVE STATS
      // -------------------------------------------------

      setStats({
        totalUsers:
          statsResponse.stats?.totalUsers || 0,

        totalAdmins:
          statsResponse.stats?.totalAdmins || 0,

        totalManagers:
          statsResponse.stats?.totalManagers || 0,

        totalMembers:
          statsResponse.stats?.totalMembers || 0,

        totalFeedback:
          statsResponse.stats?.totalFeedback || 0,

        positiveFeedback:
          statsResponse.stats?.positiveFeedback || 0,

        negativeFeedback:
          statsResponse.stats?.negativeFeedback || 0,

        neutralFeedback:
          statsResponse.stats?.neutralFeedback || 0,
      });

      // -------------------------------------------------
      // SAVE USERS
      // -------------------------------------------------

      setUsers(
        Array.isArray(usersResponse.users)
          ? usersResponse.users
          : []
      );
    } catch (error) {
      console.error(
        "Admin dashboard error:",
        error
      );

      setError(
        error.message ||
          "Unable to load admin dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    fetchAdminData();
  }, []);

  // =====================================================
  // UPDATE USER ROLE
  // =====================================================

  const handleRoleChange = async (
    userId,
    newRole
  ) => {
    try {
      setActionLoading(userId);
      setError("");

      const response = await api(
        `/admin/users/${userId}/role`,
        {
          method: "PATCH",

          body: JSON.stringify({
            role: newRole,
          }),
        }
      );

      if (
        !response.ok ||
        !response.success
      ) {
        throw new Error(
          response.message ||
            "Unable to update user role."
        );
      }

      await fetchAdminData();
    } catch (error) {
      console.error(
        "Role update error:",
        error
      );

      setError(
        error.message ||
          "Unable to update user role."
      );
    } finally {
      setActionLoading("");
    }
  };

  // =====================================================
  // DELETE USER
  // =====================================================

  const handleDeleteUser = async (
    userId,
    userName
  ) => {
    const confirmed =
      window.confirm(
        `Are you sure you want to delete ${userName}?`
      );

    if (!confirmed) {
      return;
    }

    try {
      setActionLoading(userId);
      setError("");

      const response = await api(
        `/admin/users/${userId}`,
        {
          method: "DELETE",
        }
      );

      if (
        !response.ok ||
        !response.success
      ) {
        throw new Error(
          response.message ||
            "Unable to delete user."
        );
      }

      await fetchAdminData();
    } catch (error) {
      console.error(
        "Delete user error:",
        error
      );

      setError(
        error.message ||
          "Unable to delete user."
      );
    } finally {
      setActionLoading("");
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 px-6 py-10 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-12 text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-gray-700 border-t-red-500" />

            <p className="text-gray-400">
              Loading admin dashboard...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // =====================================================
  // DASHBOARD
  // =====================================================

  return (
    <div className="min-h-screen bg-gray-950 px-6 py-10 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-red-400">
              Project LOOP
            </p>

            <h1 className="text-3xl font-bold sm:text-4xl">
              Admin Dashboard
            </h1>

            <p className="mt-3 max-w-2xl text-gray-400">
              Manage users, roles, feedback, and
              Project LOOP administration.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchAdminData}
            className="w-fit rounded-xl border border-gray-700 bg-gray-900 px-5 py-3 text-sm font-semibold text-gray-300 transition hover:border-blue-500 hover:text-blue-400"
          >
            Refresh
          </button>
        </div>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="mb-8 rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* =================================================
            USER STATISTICS
        ================================================= */}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

          {/* TOTAL USERS */}

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-lg">
            <p className="text-sm text-gray-500">
              Total Users
            </p>

            <p className="mt-3 text-4xl font-bold">
              {stats.totalUsers}
            </p>

            <p className="mt-2 text-xs text-gray-600">
              All registered users
            </p>
          </div>

          {/* ADMINISTRATORS */}

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-lg">
            <p className="text-sm text-gray-500">
              Administrators
            </p>

            <p className="mt-3 text-4xl font-bold text-red-400">
              {stats.totalAdmins}
            </p>

            <p className="mt-2 text-xs text-gray-600">
              Admin accounts
            </p>
          </div>

          {/* MANAGERS */}

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-lg">
            <p className="text-sm text-gray-500">
              Managers
            </p>

            <p className="mt-3 text-4xl font-bold text-blue-400">
              {stats.totalManagers}
            </p>

            <p className="mt-2 text-xs text-gray-600">
              Manager accounts
            </p>
          </div>

          {/* MEMBERS */}

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-lg">
            <p className="text-sm text-gray-500">
              Members
            </p>

            <p className="mt-3 text-4xl font-bold text-green-400">
              {stats.totalMembers}
            </p>

            <p className="mt-2 text-xs text-gray-600">
              Member accounts
            </p>
          </div>

        </div>

        {/* =================================================
            FEEDBACK STATISTICS
        ================================================= */}

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

          {/* TOTAL FEEDBACK */}

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <p className="text-sm text-gray-500">
              Total Feedback
            </p>

            <p className="mt-3 text-3xl font-bold">
              {stats.totalFeedback}
            </p>
          </div>

          {/* POSITIVE */}

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <p className="text-sm text-gray-500">
              Positive
            </p>

            <p className="mt-3 text-3xl font-bold text-green-400">
              {stats.positiveFeedback}
            </p>
          </div>

          {/* NEUTRAL */}

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <p className="text-sm text-gray-500">
              Neutral
            </p>

            <p className="mt-3 text-3xl font-bold text-yellow-400">
              {stats.neutralFeedback}
            </p>
          </div>

          {/* NEGATIVE */}

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <p className="text-sm text-gray-500">
              Negative
            </p>

            <p className="mt-3 text-3xl font-bold text-red-400">
              {stats.negativeFeedback}
            </p>
          </div>

        </div>

        {/* =================================================
            USER MANAGEMENT
        ================================================= */}

        <div className="mt-8 rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-lg sm:p-7">

          <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <h2 className="text-xl font-semibold">
                User Management
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Manage registered users and their
                access roles.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate("/admin/users")
              }
              className="w-fit rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Full User Management
            </button>

          </div>

          {users.length === 0 ? (
            <div className="rounded-xl border border-gray-800 bg-gray-950 p-10 text-center text-sm text-gray-500">
              No users found.
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full min-w-[700px] text-left">

                <thead>
                  <tr className="border-b border-gray-800 text-xs uppercase tracking-wide text-gray-500">

                    <th className="px-4 py-4">
                      User
                    </th>

                    <th className="px-4 py-4">
                      Email
                    </th>

                    <th className="px-4 py-4">
                      Role
                    </th>

                    <th className="px-4 py-4">
                      Joined
                    </th>

                    <th className="px-4 py-4 text-right">
                      Actions
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {users.map((user) => {
                    const isLoading =
                      actionLoading ===
                      user._id;

                    return (
                      <tr
                        key={user._id}
                        className="border-b border-gray-800/70 transition hover:bg-gray-950/60"
                      >

                        <td className="px-4 py-5">
                          <p className="font-semibold text-white">
                            {user.name}
                          </p>

                          <p className="mt-1 text-xs text-gray-600">
                            {user._id}
                          </p>
                        </td>

                        <td className="px-4 py-5 text-sm text-gray-400">
                          {user.email}
                        </td>

                        <td className="px-4 py-5">

                          <select
                            value={
                              user.role ||
                              "member"
                            }
                            disabled={isLoading}
                            onChange={(event) =>
                              handleRoleChange(
                                user._id,
                                event.target.value
                              )
                            }
                            className="rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-gray-300 outline-none transition focus:border-blue-500 disabled:opacity-50"
                          >
                            <option value="member">
                              Member
                            </option>

                            <option value="manager">
                              Manager
                            </option>

                            <option value="admin">
                              Admin
                            </option>
                          </select>

                        </td>

                        <td className="px-4 py-5 text-sm text-gray-500">
                          {user.createdAt
                            ? new Date(
                                user.createdAt
                              ).toLocaleDateString()
                            : "N/A"}
                        </td>

                        <td className="px-4 py-5 text-right">

                          <button
                            type="button"
                            disabled={isLoading}
                            onClick={() =>
                              handleDeleteUser(
                                user._id,
                                user.name
                              )
                            }
                            className="rounded-lg border border-red-500/20 px-3 py-2 text-xs font-semibold text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            {isLoading
                              ? "Processing..."
                              : "Delete"}
                          </button>

                        </td>

                      </tr>
                    );
                  })}

                </tbody>

              </table>

            </div>
          )}

        </div>

        {/* =================================================
            ADMIN QUICK ACTIONS
        ================================================= */}

        <div className="mt-8">

          <h2 className="mb-5 text-xl font-semibold">
            Admin Quick Actions
          </h2>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">

            <button
              type="button"
              onClick={() =>
                navigate("/admin/users")
              }
              className="rounded-2xl border border-gray-800 bg-gray-900 p-6 text-left transition hover:border-blue-500/40"
            >
              <p className="font-semibold">
                Manage Users
              </p>

              <p className="mt-2 text-sm text-gray-500">
                View users and change their roles.
              </p>
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/admin/feedback")
              }
              className="rounded-2xl border border-gray-800 bg-gray-900 p-6 text-left transition hover:border-blue-500/40"
            >
              <p className="font-semibold">
                Manage Feedback
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Review and manage customer feedback.
              </p>
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/analytics")
              }
              className="rounded-2xl border border-gray-800 bg-gray-900 p-6 text-left transition hover:border-blue-500/40"
            >
              <p className="font-semibold">
                Analytics
              </p>

              <p className="mt-2 text-sm text-gray-500">
                View customer feedback analytics.
              </p>
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/ask-ai")
              }
              className="rounded-2xl border border-gray-800 bg-gray-900 p-6 text-left transition hover:border-blue-500/40"
            >
              <p className="font-semibold">
                LOOP AI
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Ask AI questions about customer
                feedback.
              </p>
            </button>

          </div>

        </div>

        <div className="h-16" />

      </div>
    </div>
  );
}

export default AdminDashboard;