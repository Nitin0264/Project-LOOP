import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-blue-500">
          Project LOOP
        </h1>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-gray-300 hover:text-white transition"
          >
            Home
          </Link>

          <Link
            to="/login"
            className="text-gray-300 hover:text-white transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-5 py-2 bg-blue-500 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-[80vh] flex items-center justify-center px-6">
        <div className="max-w-4xl text-center">

          <p className="text-blue-400 font-semibold mb-4">
            WELCOME TO PROJECT LOOP
          </p>

          <h2 className="text-5xl md:text-6xl font-bold leading-tight">
            Learn. Connect.
            <span className="text-blue-500"> Grow.</span>
          </h2>

          <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
            Project LOOP is a platform designed to help users connect,
            collaborate, share knowledge, and build meaningful opportunities
            together.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="px-8 py-3 bg-blue-500 rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              Join Project LOOP
            </Link>

            <Link
              to="/login"
              className="px-8 py-3 border border-gray-600 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Login
            </Link>
          </div>

        </div>
      </section>

      {/* Features */}
      <section className="px-8 py-16 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-3xl font-bold text-center">
            Why Project LOOP?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

            <div className="p-6 rounded-xl border border-gray-800 bg-gray-900">
              <h3 className="text-xl font-semibold text-blue-400">
                Connect
              </h3>
              <p className="mt-3 text-gray-400">
                Connect with people who share your interests and goals.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-gray-800 bg-gray-900">
              <h3 className="text-xl font-semibold text-blue-400">
                Collaborate
              </h3>
              <p className="mt-3 text-gray-400">
                Work together on ideas, projects, and opportunities.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-gray-800 bg-gray-900">
              <h3 className="text-xl font-semibold text-blue-400">
                Grow
              </h3>
              <p className="mt-3 text-gray-400">
                Learn new skills and grow your professional network.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-6 text-center text-gray-500">
        © 2026 Project LOOP. All rights reserved.
      </footer>

    </div>
  );
}

export default HomePage;