import React from 'react'
import { Link } from 'react-router-dom'

function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-950">

      <form className="w-full max-w-md flex flex-col gap-5 p-8 rounded-xl border border-gray-700 bg-gray-900">

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">
            Welcome Back
          </h1>

          <p className="mt-2 text-gray-400">
            Login to Project LOOP
          </p>
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
            placeholder="Enter your password"
            className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-transparent text-white outline-none focus:border-blue-500"
          />
        </div>

        {/* Sign In */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
        >
          Sign In
        </button>

        {/* Register */}
        <p className="text-center text-gray-400">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-blue-400 hover:text-blue-300"
          >
            Create Account
          </Link>
        </p>

      </form>
    </div>
  )
}

export default LoginPage;