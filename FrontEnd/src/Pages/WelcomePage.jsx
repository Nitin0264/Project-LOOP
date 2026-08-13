import React from "react";
import { Link } from "react-router-dom";

function WelcomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-950">
      <div className="w-full max-w-3xl text-center">

        <h1 className="text-5xl md:text-6xl font-bold text-white">
          Welcome to <span className="text-blue-500">Project LOOP</span>
        </h1>

        <p className="mt-5 text-lg text-gray-400 max-w-2xl mx-auto">
          Connect, collaborate, learn, and grow together with Project LOOP.
          Start your journey with us today.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/login"
            className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
          >
            Sign In
          </Link>

          <Link
            to="/register"
            className="px-8 py-3 border border-gray-600 text-white font-semibold rounded-lg hover:bg-gray-800 transition"
          >
            Create Account
          </Link>
        </div>

      </div>
    </div>
  );
}

export default WelcomePage;