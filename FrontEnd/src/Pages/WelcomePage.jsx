import React from 'react'
import { Link } from 'react-router-dom'

function WelcomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 gap-6">

      <p className="text-blue-400 font-semibold tracking-widest">
        PROJECT LOOP
      </p>

      <h1 className="text-5xl font-bold">
        Turn Customer Feedback Into
        <span className="block text-blue-400">
          Actionable Intelligence
        </span>
      </h1>

      <p className="max-w-2xl text-lg text-gray-400">
        Collect, organize and analyze customer feedback
        from one centralized platform using Artificial Intelligence.
      </p>

      <div className="flex gap-4">
        <Link
          to="/login"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-800 transition"
        >
          Get Started
        </Link>

        <Link
          to="/info"
          className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-500 transition"
        >
          Learn More
        </Link>
      </div>

    </div>
  )
}

export default WelcomePage