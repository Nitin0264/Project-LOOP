import React from "react";
import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";

function getUserFromToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  try {
    return JSON.parse(
      atob(token.split(".")[1])
    );
  } catch {
    return null;
  }
}

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const user = getUserFromToken();

  const isAdmin =
    user?.role === "admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition ${
      isActive
        ? "text-blue-400"
        : "text-gray-300 hover:text-blue-400"
    }`;

  return (
    <nav className="w-full border-b border-gray-800 bg-gray-950">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">

        {/* =====================================================
            LOGO
        ===================================================== */}

        <Link
          to={
            token
              ? "/dashboard"
              : "/"
          }
          className="text-xl font-bold tracking-tight text-blue-500 transition hover:text-blue-400"
        >
          Project LOOP
        </Link>


        {/* =====================================================
            NAVIGATION
        ===================================================== */}

        <div className="flex items-center gap-5">

          {!token ? (

            <>
              <NavLink
                to="/"
                className={navLinkClass}
              >
                Home
              </NavLink>

              <NavLink
                to="/info"
                className={navLinkClass}
              >
                Features
              </NavLink>

              <NavLink
                to="/info"
                className={navLinkClass}
              >
                About
              </NavLink>

              <NavLink
                to="/info"
                className={navLinkClass}
              >
                Contact
              </NavLink>

              <NavLink
                to="/login"
                className={navLinkClass}
              >
                Sign In
              </NavLink>

              <Link
                to="/register"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Get Started
              </Link>
            </>

          ) : (

            <>

              <NavLink
                to="/dashboard"
                className={navLinkClass}
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/feedback"
                className={navLinkClass}
              >
                Feedback
              </NavLink>

              <NavLink
                to="/add-feedback"
                className={navLinkClass}
              >
                Add Feedback
              </NavLink>

              <NavLink
                to="/analytics"
                className={navLinkClass}
              >
                Analytics
              </NavLink>

              <NavLink
                to="/ask-ai"
                className={navLinkClass}
              >
                Ask AI
              </NavLink>

              {/* =================================================
                  ADMIN ONLY
              ================================================= */}

              {isAdmin && (
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                      isActive
                        ? "border-red-500/40 bg-red-500/10 text-red-400"
                        : "border-gray-700 text-gray-300 hover:border-red-500/30 hover:text-red-400"
                    }`
                  }
                >
                  Admin
                </NavLink>
              )}

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg border border-red-500/30 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
              >
                Logout
              </button>

            </>
          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;