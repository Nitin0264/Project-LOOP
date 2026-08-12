import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="w-full px-8 py-4 border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <div>
          <Link
            className="text-xl font-semibold text-white hover:text-gray-300"
            to="/"
          >
            Project Loop
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-5 p-3">

          <Link
            className="text-xl font-semibold text-white hover:text-gray-300"
            to="/"
          >
            Home
          </Link>

          <Link
            className="text-xl font-semibold text-white hover:text-gray-300"
          >
            Features
          </Link>

          <Link
            className="text-xl font-semibold text-white hover:text-gray-300"
          >
            About
          </Link>

          <Link
            className="text-xl font-semibold text-white hover:text-gray-300"
          >
            Contact
          </Link>

          {/* Sign In */}
          <Link
            className="text-xl font-semibold text-white hover:text-gray-300"
            to="/login"
          >
            Sign In
          </Link>

          {/* Get Started */}
          <Link
            className="px-5 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
            to="/login"
          >
            Get Started
          </Link>

        </div>
      </div>
    </nav>
  )
}

export default Navbar