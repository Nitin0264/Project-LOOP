import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function RegisterPage() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      const response = await fetch(
        'http://localhost:5000/auth/register',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify(formData)
        }
      )

      const data = await response.json()

      console.log(data)

    } catch (error) {

      console.error('Registration failed:', error)

    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md flex flex-col gap-5 p-8 rounded-xl border border-gray-700"
      >

        {/* Heading */}
        <div className="text-center">

          <h1 className="text-3xl font-bold text-white">
            Create Your Account
          </h1>

          <p className="mt-2 text-gray-400">
            Join Project LOOP
          </p>

        </div>

        {/* Name */}
        <div className="flex flex-col gap-2">

          <label
            htmlFor="name"
            className="text-white font-medium"
          >
            Full Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white outline-none focus:border-blue-500"
          />

        </div>

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
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
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
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            className="px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white outline-none focus:border-blue-500"
          />

        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-2">

          <label
            htmlFor="confirmPassword"
            className="text-white font-medium"
          >
            Confirm Password
          </label>

          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            className="px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white outline-none focus:border-blue-500"
          />

        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
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