import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="w-full px-8 py-4 border-b border-gray-700 ">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-5 ">

        {/* Logo */}
        <div>
          <Link
            className="text-xl font-semibold text-blue-600 hover:text-blue-300"
            to="/"
          >
            Project LOOP
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex gap-5 items-center">

          <Link
            className="text-xl font-semibold text-blue-600 hover:text-blue-300"
            to="/"
          >
            Home
          </Link>

          <Link
            className="text-xl font-semibold text-blue-600 hover:text-blue-300"
            to="/info"
          >
            Features
          </Link>

          <Link
            className="text-xl font-semibold text-blue-600 hover:text-blue-300"
            to="/info"
          >
            About
          </Link>

          <Link
            className="text-xl font-semibold text-blue-600 hover:text-blue-300"
            to="/info"
          >
            Contact
          </Link>

          <Link
            className="text-xl font-semibold text-blue-600 hover:text-blue-300"
            to="/login"
          >
            Sign In
          </Link>

          <Link
            className="px-4 py-2 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700"
            to="/register"
          >
            Get Started
          </Link>

        </div>
      </div>
    </nav>
  )
}

export default Navbar