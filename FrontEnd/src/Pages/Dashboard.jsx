import React from "react";
import DashboardSidebar from "../Components/DashboardSidebar";

function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex">

      {/* Sidebar */}
      <DashboardSidebar />


      {/* Main Content */}
      <main className="flex-1 px-6 py-8 md:px-10 lg:px-12">

        <div className="max-w-7xl mx-auto">

          {/* Dashboard Header */}
          <div className="mb-10">

            <p className="text-sm font-semibold tracking-wider text-blue-400 uppercase">
              Project LOOP
            </p>

            <h1 className="text-4xl md:text-5xl font-bold mt-3">
              Dashboard
            </h1>

            <p className="text-gray-400 mt-4 max-w-2xl text-base md:text-lg leading-relaxed">
              Welcome to your customer feedback intelligence workspace.
              Monitor feedback, discover trends, and understand what your
              customers are saying.
            </p>

          </div>


          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

            {/* Total Feedback */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition">

              <p className="text-sm text-gray-400">
                Total Feedback
              </p>

              <h2 className="text-3xl font-bold mt-4">
                0
              </h2>

              <p className="text-sm text-gray-500 mt-3">
                Feedback collected
              </p>

            </div>


            {/* Positive Feedback */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition">

              <p className="text-sm text-gray-400">
                Positive Feedback
              </p>

              <h2 className="text-3xl font-bold text-green-400 mt-4">
                0%
              </h2>

              <p className="text-sm text-gray-500 mt-3">
                Positive sentiment
              </p>

            </div>


            {/* Negative Feedback */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition">

              <p className="text-sm text-gray-400">
                Negative Feedback
              </p>

              <h2 className="text-3xl font-bold text-red-400 mt-4">
                0%
              </h2>

              <p className="text-sm text-gray-500 mt-3">
                Negative sentiment
              </p>

            </div>


            {/* Neutral Feedback */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition">

              <p className="text-sm text-gray-400">
                Neutral Feedback
              </p>

              <h2 className="text-3xl font-bold text-yellow-400 mt-4">
                0%
              </h2>

              <p className="text-sm text-gray-500 mt-3">
                Neutral sentiment
              </p>

            </div>

          </div>


          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">

            {/* Feedback Overview */}
            <div className="xl:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8">

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-2xl font-semibold">
                    Feedback Overview
                  </h2>

                  <p className="text-gray-400 mt-2">
                    Monitor your customer feedback activity.
                  </p>

                </div>

              </div>


              {/* Chart Placeholder */}
              <div className="h-72 mt-8 flex items-center justify-center rounded-xl border border-dashed border-gray-700 bg-gray-950">

                <div className="text-center px-6">

                  <p className="text-gray-400 text-lg">
                    Analytics chart
                  </p>

                  <p className="text-gray-600 text-sm mt-2">
                    Your feedback analytics will appear here.
                  </p>

                </div>

              </div>

            </div>


            {/* Quick Actions */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8">

              <h2 className="text-2xl font-semibold">
                Quick Actions
              </h2>

              <p className="text-gray-400 mt-2">
                Quickly access important actions.
              </p>


              <div className="flex flex-col gap-4 mt-8">

                <button
                  type="button"
                  className="w-full px-5 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-semibold"
                >
                  Add Feedback
                </button>


                <button
                  type="button"
                  className="w-full px-5 py-3.5 rounded-lg border border-gray-700 hover:bg-gray-800 transition font-semibold"
                >
                  View Feedback
                </button>


                <button
                  type="button"
                  className="w-full px-5 py-3.5 rounded-lg border border-gray-700 hover:bg-gray-800 transition font-semibold"
                >
                  Generate Report
                </button>

              </div>

            </div>

          </div>


          {/* AI Insights */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8 mb-8">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

              <div>

                <p className="text-sm font-semibold text-blue-400 uppercase tracking-wide">
                  AI Intelligence
                </p>

                <h2 className="text-2xl font-semibold mt-2">
                  AI Customer Insights
                </h2>

                <p className="text-gray-400 mt-2 max-w-2xl">
                  AI-powered insights from your customer feedback will
                  appear here once feedback data is available.
                </p>

              </div>

              <button
                type="button"
                className="px-5 py-3 rounded-lg border border-gray-700 hover:bg-gray-800 transition font-medium"
              >
                Explore Insights
              </button>

            </div>


            {/* Insight Placeholder */}
            <div className="mt-8 p-6 rounded-xl bg-gray-950 border border-gray-800">

              <p className="text-gray-500">
                No AI insights available yet.
              </p>

            </div>

          </div>


          {/* Recent Activity */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8">

            <h2 className="text-2xl font-semibold">
              Recent Activity
            </h2>

            <p className="text-gray-400 mt-2">
              Your latest customer feedback activity will appear here.
            </p>


            <div className="mt-8 p-8 rounded-xl border border-dashed border-gray-700 text-center">

              <p className="text-gray-500">
                No recent activity.
              </p>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default DashboardPage;