import React from 'react'
import { Link } from 'react-router-dom'

function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">

      <form className="w-full max-w-md flex flex-col gap-5 p-8 rounded-xl border border-gray-700">

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">
            Create Your Account
          </h1>

          <p className="mt-2 text-gray-400">
            Join Project LOOP
          </p>
        </div>

        {/* Full Name */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="text-sm font-medium text-white"
          >
            Full Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-transparent text-white outline-none focus:border-blue-500"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-sm font-medium text-white"
          >
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-transparent text-white outline-none focus:border-blue-500"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-white"
          >
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            placeholder="Create a password"
            className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-transparent text-white outline-none focus:border-blue-500"
          />
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-white"
          >
            Confirm Password
          </label>

          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-transparent text-white outline-none focus:border-blue-500"
          />
        </div>

        {/* Create Account */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
        >
          Create Account
        </button>

        {/* Login */}
        <p className="text-center text-gray-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-blue-400 hover:text-blue-300"
          >
            Sign In
          </Link>
        </p>

      </form>
    </div>
  )
}

export default RegisterPage