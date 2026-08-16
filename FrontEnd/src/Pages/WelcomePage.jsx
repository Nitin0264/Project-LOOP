import React from 'react'
import { Link } from 'react-router-dom'

function WelcomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">

      <h1 className="text-5xl font-bold text-blue-300">
        PROJECT LOOP
      </h1>

      <h3 className="max-w-3xl mt-6 text-xl text-gray-300 leading-relaxed">
        AI-Powered Customer Feedback Intelligence Platform.
        Collect, organize and analyze customer feedback
        using Artificial Intelligence.
      </h3>

      <div className="flex gap-4 mt-8">

        <Link
          to="/register"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
        >
          Get Started
        </Link>

        <Link
          to="/info"
          className="px-6 py-3 border border-gray-600 text-blue-600 rounded-lg font-semibold hover:bg-gray-800 hover:text-white"
        >
          Learn More
        </Link>

      </div>

    </div>
  )
}

export default WelcomePage