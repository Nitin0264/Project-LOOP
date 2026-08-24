import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFeedback: 0,
    positive: 0,
    negative: 0,
    neutral: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // FETCH ADMIN DATA
  // =====================================================

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await api("/admin/stats");

      console.log("Admin dashboard response:", data);

      if (data.status === 401) {
        setError("Your session has expired. Please login again.");
        return;
      }

      if (data.status === 403) {
        setError("You do not have permission to access the admin dashboard.");
        return;
      }

      if (!data.ok || data.success === false) {
        throw new Error(
          data.message || "Unable to load admin dashboard."
        );
      }

      const adminData = data.stats || data;

      setStats({
        totalUsers: adminData?.totalUsers || 0,
        totalFeedback: adminData?.totalFeedback || 0,
        positive: adminData?.positive || 0,
        negative: adminData?.negative || 0,
        neutral: adminData?.neutral || 0,
      });
    } catch (error) {
      console.error("Admin dashboard error:", error);

      setError(
        error.message || "Unable to load admin dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 px-5 py-10 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">

          <div className="mb-10">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
              Project LOOP
            </p>

            <h1 className="text-3xl font-bold sm:text-4xl">
              Admin Dashboard
            </h1>

            <p className="mt-3 text-gray-500">
              Loading platform administration data...
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-36 animate-pulse rounded-2xl border border-gray-800 bg-gray-900"
              />
            ))}
          </div>

        </div>
      </div>
    );
  }

  // =====================================================
  // DASHBOARD
  // =====================================================

  return (
    <div className="min-h-screen bg-gray-950 px-5 py-10 text-white sm:px-8 lg:px-12">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
              Project LOOP
            </p>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Admin Dashboard
            </h1>

            <p className="mt-3 max-w-2xl text-gray-400">
              Manage users, monitor feedback activity, and
              oversee the Project LOOP platform.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchAdminData}
            className="w-fit rounded-xl border border-gray-700 bg-gray-900 px-5 py-3 text-sm font-semibold text-gray-300 transition hover:border-blue-500/40 hover:text-blue-400"
          >
            Refresh
          </button>

        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-8 rounded-xl border border-red-500/20 bg-red-500/10 p-5">

            <p className="font-semibold text-red-400">
              Admin Dashboard Error
            </p>

            <p className="mt-2 text-sm text-red-300">
              {error}
            </p>

            <button
              type="button"
              onClick={fetchAdminData}
              className="mt-4 rounded-lg bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300 hover:bg-red-500/20"
            >
              Try Again
            </button>

          </div>
        )}

        {/* STAT CARDS */}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-lg">
            <p className="text-sm text-gray-500">
              Total Users
            </p>

            <p className="mt-3 text-4xl font-bold text-blue-400">
              {stats.totalUsers}
            </p>

            <p className="mt-2 text-xs text-gray-600">
              Registered platform users
            </p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-lg">
            <p className="text-sm text-gray-500">
              Total Feedback
            </p>

            <p className="mt-3 text-4xl font-bold">
              {stats.totalFeedback}
            </p>

            <p className="mt-2 text-xs text-gray-600">
              Feedback entries collected
            </p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-lg">
            <p className="text-sm text-gray-500">
              Positive Feedback
            </p>

            <p className="mt-3 text-4xl font-bold text-green-400">
              {stats.positive}
            </p>

            <p className="mt-2 text-xs text-gray-600">
              Positive customer sentiment
            </p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-lg">
            <p className="text-sm text-gray-500">
              Negative Feedback
            </p>

            <p className="mt-3 text-4xl font-bold text-red-400">
              {stats.negative}
            </p>

            <p className="mt-2 text-xs text-gray-600">
              Negative customer sentiment
            </p>
          </div>

        </div>

        {/* ADMIN ACTIONS */}

        <div className="mt-8 rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-lg sm:p-8">

          <div className="mb-6">
            <h2 className="text-xl font-semibold">
              Administration
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Manage the most important parts of Project LOOP.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            <button
              type="button"
              onClick={() => navigate("/admin/users")}
              className="rounded-xl border border-gray-800 bg-gray-950 p-5 text-left transition hover:border-blue-500/40 hover:bg-blue-500/5"
            >
              <p className="font-semibold text-white">
                Manage Users
              </p>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                View users and manage their platform access.
              </p>
            </button>

            <button
              type="button"
              onClick={() => navigate("/feedback")}
              className="rounded-xl border border-gray-800 bg-gray-950 p-5 text-left transition hover:border-blue-500/40 hover:bg-blue-500/5"
            >
              <p className="font-semibold text-white">
                View Feedback
              </p>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Review customer feedback and AI analysis.
              </p>
            </button>

            <button
              type="button"
              onClick={() => navigate("/analytics")}
              className="rounded-xl border border-gray-800 bg-gray-950 p-5 text-left transition hover:border-blue-500/40 hover:bg-blue-500/5"
            >
              <p className="font-semibold text-white">
                View Analytics
              </p>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Analyze customer sentiment and recurring themes.
              </p>
            </button>

            <button
              type="button"
              onClick={() => navigate("/ask-ai")}
              className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-5 text-left transition hover:bg-blue-500/10"
            >
              <p className="font-semibold text-blue-400">
                Ask LOOP AI
              </p>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Ask questions about customer feedback.
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