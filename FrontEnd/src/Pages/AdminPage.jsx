import React from "react";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 px-5 py-10 text-white sm:px-8 md:px-10 lg:px-12">

      <div className="mx-auto max-w-7xl">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-10">

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-purple-400">
            Project LOOP
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Admin Panel
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-gray-400">
            Manage your Project LOOP workspace, users,
            permissions, and platform activity.
          </p>

        </div>


        {/* =================================================
            ADMIN STATUS
        ================================================= */}

        <div className="mb-8 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-6">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 font-bold text-purple-400">
              A
            </div>

            <div>

              <h2 className="font-semibold text-white">
                Administrator Access
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                You have administrator permissions for
                Project LOOP.
              </p>

            </div>

          </div>

        </div>


        {/* =================================================
            ADMIN FEATURES
        ================================================= */}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

          {/* USERS */}

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-lg">

            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 font-bold text-blue-400">
              U
            </div>

            <h2 className="text-xl font-semibold">
              User Management
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              View users, manage roles, and control access
              to Project LOOP.
            </p>

            <button
              type="button"
              disabled
              className="mt-6 cursor-not-allowed rounded-xl border border-gray-700 px-4 py-2.5 text-sm font-semibold text-gray-500"
            >
              Coming Next
            </button>

          </div>


          {/* FEEDBACK */}

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-lg">

            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-green-500/10 font-bold text-green-400">
              F
            </div>

            <h2 className="text-xl font-semibold">
              Feedback Management
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Review and manage all customer feedback
              collected by your workspace.
            </p>

            <button
              type="button"
              onClick={() => navigate("/feedback")}
              className="mt-6 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              View Feedback
            </button>

          </div>


          {/* ANALYTICS */}

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-lg">

            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-500/10 font-bold text-yellow-400">
              A
            </div>

            <h2 className="text-xl font-semibold">
              Analytics
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Monitor customer sentiment, themes, and
              feedback performance.
            </p>

            <button
              type="button"
              onClick={() => navigate("/analytics")}
              className="mt-6 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              View Analytics
            </button>

          </div>

        </div>


        {/* =================================================
            SECURITY NOTE
        ================================================= */}

        <div className="mt-8 rounded-2xl border border-gray-800 bg-gray-900 p-6">

          <h2 className="font-semibold text-white">
            Role-Based Access Control
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Project LOOP now recognizes the user's role from
            the authenticated JWT. Admin-only frontend routes
            are protected through the ProtectedRoute component.
          </p>

        </div>


        <div className="h-16" />

      </div>
    </div>
  );
}

export default AdminPage;