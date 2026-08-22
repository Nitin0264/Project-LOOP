import React from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";


function AdminDashboard() {
  const navigate = useNavigate();


  // =====================================================
  // USER
  // =====================================================

  let user = null;

  try {
    user = JSON.parse(
      localStorage.getItem("user")
    );
  } catch {
    user = null;
  }


  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login", {
      replace: true,
    });
  };


  // =====================================================
  // ADMIN DASHBOARD
  // =====================================================

  return (
    <div className="min-h-screen bg-gray-950 px-5 py-10 text-white sm:px-8 lg:px-12">

      <div className="mx-auto max-w-7xl">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

          <div>

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
              Project LOOP
            </p>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Admin Dashboard
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-gray-400">
              Manage your Project LOOP workspace, customer
              feedback, analytics, and AI-powered insights.
            </p>

          </div>


          {/* ADMIN BADGE */}

          <div className="flex items-center gap-3">

            <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-3">

              <p className="text-xs uppercase tracking-wide text-blue-400">
                Role
              </p>

              <p className="mt-1 font-semibold capitalize text-white">
                {user?.role || "Admin"}
              </p>

            </div>

          </div>

        </div>


        {/* =================================================
            WELCOME
        ================================================= */}

        <div className="mb-8 rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-lg sm:p-7">

          <p className="text-sm text-gray-500">
            Signed in as
          </p>

          <h2 className="mt-2 text-2xl font-semibold">
            {user?.name || "Administrator"}
          </h2>

          {user?.email && (
            <p className="mt-1 text-sm text-gray-500">
              {user.email}
            </p>
          )}

        </div>


        {/* =================================================
            ADMIN ACTIONS
        ================================================= */}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">


          {/* =================================================
              ANALYTICS
          ================================================= */}

          <Link
            to="/analytics"
            className="group rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-lg transition hover:-translate-y-1 hover:border-blue-500/40 hover:bg-gray-900/80"
          >

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 font-bold text-blue-400">
              A
            </div>

            <h3 className="mt-5 text-lg font-semibold">
              Analytics
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              View customer sentiment, themes, trends, and
              feedback performance.
            </p>

            <p className="mt-5 text-sm font-semibold text-blue-400 transition group-hover:text-blue-300">
              Open Analytics →
            </p>

          </Link>


          {/* =================================================
              FEEDBACK
          ================================================= */}

          <Link
            to="/feedback"
            className="group rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-lg transition hover:-translate-y-1 hover:border-blue-500/40 hover:bg-gray-900/80"
          >

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 font-bold text-green-400">
              F
            </div>

            <h3 className="mt-5 text-lg font-semibold">
              Feedback
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Review, edit, delete, and inspect all customer
              feedback.
            </p>

            <p className="mt-5 text-sm font-semibold text-green-400 transition group-hover:text-green-300">
              Manage Feedback →
            </p>

          </Link>


          {/* =================================================
              ADD FEEDBACK
          ================================================= */}

          <Link
            to="/add-feedback"
            className="group rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-lg transition hover:-translate-y-1 hover:border-blue-500/40 hover:bg-gray-900/80"
          >

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 font-bold text-purple-400">
              +
            </div>

            <h3 className="mt-5 text-lg font-semibold">
              Add Feedback
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Add new customer feedback and automatically send
              it to Gemini for analysis.
            </p>

            <p className="mt-5 text-sm font-semibold text-purple-400 transition group-hover:text-purple-300">
              Add Feedback →
            </p>

          </Link>


          {/* =================================================
              ASK AI
          ================================================= */}

          <Link
            to="/ask-ai"
            className="group rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-lg transition hover:-translate-y-1 hover:border-blue-500/40 hover:bg-gray-900/80"
          >

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10 font-bold text-yellow-400">
              AI
            </div>

            <h3 className="mt-5 text-lg font-semibold">
              Ask AI
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Ask Gemini questions about your customer
              feedback and business insights.
            </p>

            <p className="mt-5 text-sm font-semibold text-yellow-400 transition group-hover:text-yellow-300">
              Ask AI →
            </p>

          </Link>

        </div>


        {/* =================================================
            ADMIN CONTROL SECTION
        ================================================= */}

        <div className="mt-8 rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-lg sm:p-7">

          <div className="mb-6">

            <h2 className="text-xl font-semibold">
              Administration
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Administrative controls for your Project LOOP
              workspace.
            </p>

          </div>


          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">


            {/* USER MANAGEMENT */}

            <div className="rounded-xl border border-gray-800 bg-gray-950 p-5">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800 font-semibold text-gray-300">
                U
              </div>

              <h3 className="mt-4 font-semibold">
                User Management
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Manage workspace users and their roles.
              </p>

              <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-wide text-yellow-500">
                Coming Next
              </span>

            </div>


            {/* ROLE MANAGEMENT */}

            <div className="rounded-xl border border-gray-800 bg-gray-950 p-5">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800 font-semibold text-gray-300">
                R
              </div>

              <h3 className="mt-4 font-semibold">
                Role Management
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Control admin, manager, and member permissions.
              </p>

              <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-wide text-yellow-500">
                Coming Next
              </span>

            </div>


            {/* SYSTEM */}

            <div className="rounded-xl border border-gray-800 bg-gray-950 p-5">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800 font-semibold text-gray-300">
                S
              </div>

              <h3 className="mt-4 font-semibold">
                System Settings
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Configure workspace and application settings.
              </p>

              <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-wide text-yellow-500">
                Coming Next
              </span>

            </div>

          </div>

        </div>


        {/* =================================================
            LOGOUT
        ================================================= */}

        <div className="mt-8 flex justify-end">

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-xl border border-red-500/30 bg-red-500/5 px-5 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
          >
            Logout
          </button>

        </div>


        <div className="h-12" />

      </div>

    </div>
  );
}


export default AdminDashboard;