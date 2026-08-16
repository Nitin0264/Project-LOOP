import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setLoading(true);

    try {

      const response = await fetch(
        "http://localhost:5000/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(formData)
        }
      );


      const data = await response.json();


      if (!response.ok) {

        setError(data.message || "Login failed");

        setLoading(false);

        return;
      }


      // Save JWT token
      localStorage.setItem("token", data.token);


      // Login successful
      navigate("/dashboard");


    } catch (error) {

      console.error(error);

      setError(
        "Unable to connect to the server. Please try again."
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-6 py-16">

      <div className="w-full max-w-md">

        {/* Heading */}

        <div className="text-center mb-10">

          <h1 className="text-4xl font-bold">
            Welcome Back
          </h1>

          <p className="mt-3 text-gray-400">
            Sign in to continue to your Project LOOP workspace.
          </p>

        </div>


        {/* Login Card */}

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
          >


            {/* Error */}

            {error && (

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">

                {error}

              </div>

            )}


            {/* Email */}

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
                className="w-full px-4 py-3.5 rounded-lg bg-gray-950 border border-gray-700 text-white placeholder-gray-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />

            </div>


            {/* Password */}

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
                className="w-full px-4 py-3.5 rounded-lg bg-gray-950 border border-gray-700 text-white placeholder-gray-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />

            </div>


            {/* Remember + Forgot */}

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


            {/* Login Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 disabled:cursor-not-allowed font-semibold transition"
            >

              {loading ? "Signing in..." : "Sign In to LOOP"}

            </button>


          </form>


          {/* Register */}

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


        {/* Security message */}

        <p className="text-center text-xs text-gray-600 mt-6">

          Your account is protected with secure authentication.

        </p>

      </div>

    </div>

  );

}

export default LoginPage;