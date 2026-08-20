import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =====================================================
  // LOGIN
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await api("/auth/login", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      // =================================================
      // LOGIN FAILED
      // =================================================

      if (!data.success) {
        setError(data.message || "Login failed.");
        return;
      }

      // =================================================
      // CHECK TOKEN
      // =================================================

      if (!data.token) {
        setError(
          "Login successful, but no authentication token was received."
        );
        return;
      }

      // =================================================
      // SAVE JWT
      // =================================================

      localStorage.setItem("token", data.token);

      // =================================================
      // SAVE USER DATA
      // =================================================

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      // =================================================
      // REDIRECT TO DASHBOARD
      // =================================================

      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      console.error("Login error:", error);

      setError(
        error.message ||
          "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">

        {/* =================================================
            HEADING
        ================================================= */}

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold">
            Welcome Back
          </h1>

          <p className="mt-3 text-gray-400">
            Sign in to continue to your Project LOOP workspace.
          </p>
        </div>

        {/* =================================================
            LOGIN CARD
        ================================================= */}

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
          >

            {/* =================================================
                ERROR
            ================================================= */}

            {error && (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* =================================================
                EMAIL
            ================================================= */}

            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-200"
              >
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                autoComplete="email"
                className="w-full px-4 py-3.5 rounded-lg bg-gray-950 border border-gray-700 text-white placeholder-gray-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
            </div>

            {/* =================================================
                PASSWORD
            ================================================= */}

            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-200"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                className="w-full px-4 py-3.5 rounded-lg bg-gray-950 border border-gray-700 text-white placeholder-gray-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
            </div>

            {/* =================================================
                REMEMBER + FORGOT
            ================================================= */}

            <div className="flex items-center justify-between text-sm">

              <label className="flex items-center gap-2 text-gray-400">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                />

                Remember me
              </label>

              <button
                type="button"
                className="text-blue-400 hover:text-blue-300"
              >
                Forgot password?
              </button>

            </div>

            {/* =================================================
                LOGIN BUTTON
            ================================================= */}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 disabled:cursor-not-allowed font-semibold transition"
            >
              {loading
                ? "Signing in..."
                : "Sign In to LOOP"}
            </button>

          </form>

          {/* =================================================
              REGISTER
          ================================================= */}

          <div className="mt-8 pt-6 border-t border-gray-800 text-center">
            <p className="text-gray-400">
              Don't have an account?

              <Link
                to="/register"
                className="ml-2 text-blue-400 hover:text-blue-300 font-medium"
              >
                Create Account
              </Link>
            </p>
          </div>

        </div>

        {/* =================================================
            SECURITY MESSAGE
        ================================================= */}

        <p className="text-center text-xs text-gray-600 mt-6">
          Your account is protected with secure authentication.
        </p>

      </div>
    </div>
  );
}

export default LoginPage;