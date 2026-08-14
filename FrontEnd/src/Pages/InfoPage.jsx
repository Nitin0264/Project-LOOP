import React from 'react'

function InfoPage() {
  return (
    <div className="min-h-screen px-6 py-16">

      <div className="max-w-5xl mx-auto text-center">

        <h1 className="text-4xl font-bold text-white">
          About Project LOOP
        </h1>

        <p className="mt-6 text-lg text-gray-400 leading-relaxed">
          Project LOOP is an AI-powered customer feedback intelligence
          platform that helps businesses collect, organize and analyze
          customer feedback from multiple channels.
        </p>

      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 mt-12">

        <div className="p-6 border border-gray-700 rounded-xl">
          <h2 className="text-xl font-semibold text-white">
            Multi-Channel Feedback
          </h2>

          <p className="mt-3 text-gray-400">
            Collect feedback from reviews, surveys, support channels
            and other customer communication sources.
          </p>
        </div>

        <div className="p-6 border border-gray-700 rounded-xl">
          <h2 className="text-xl font-semibold text-white">
            AI Analysis
          </h2>

          <p className="mt-3 text-gray-400">
            Analyze customer sentiment, themes and emerging trends
            using artificial intelligence.
          </p>
        </div>

        <div className="p-6 border border-gray-700 rounded-xl">
          <h2 className="text-xl font-semibold text-white">
            Analytics
          </h2>

          <p className="mt-3 text-gray-400">
            Transform customer feedback into useful dashboards
            and business insights.
          </p>
        </div>

        <div className="p-6 border border-gray-700 rounded-xl">
          <h2 className="text-xl font-semibold text-white">
            Voice of Customer
          </h2>

          <p className="mt-3 text-gray-400">
            Generate actionable reports that help teams understand
            what customers actually want.
          </p>
        </div>

      </div>

    </div>
  )
}

export default InfoPage