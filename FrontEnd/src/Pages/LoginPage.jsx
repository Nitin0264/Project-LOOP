import React from 'react'
import { Link } from 'react-router-dom'

function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-white">
            Welcome Back
          </h1>

          <p className="mt-2 text-gray-400">
            Login to Project LOOP
          </p>

        </div>

        <form className="flex flex-col gap-5">

          {/* Email */}
          <div className="flex flex-col gap-2">

            <label
              htmlFor="email"
              className="text-white font-medium"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white outline-none focus:border-blue-500"
            />

          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">

            <label
              htmlFor="password"
              className="text-white font-medium"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white outline-none focus:border-blue-500"
            />

          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
          >
            Sign In
          </button>

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

    </div>
  )
}

export default LoginPage