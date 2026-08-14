import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function FeedbackPage() {

  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // Get feedback from backend
  useEffect(() => {

    const fetchFeedback = async () => {

      try {

        const response = await fetch(
          "http://localhost:5000/feedback"
        );

        const data = await response.json();


        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch feedback"
          );
        }


        setFeedbacks(data.feedbacks);

      } catch (error) {

        console.error("Error fetching feedback:", error);

        setError(
          "Unable to load feedback. Please try again."
        );

      } finally {

        setLoading(false);

      }

    };


    fetchFeedback();

  }, []);


  // Count feedback by source for now
  const totalFeedback = feedbacks.length;


  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-8 md:px-10 lg:px-12">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

          <div>

            <p className="text-sm font-semibold tracking-wider text-blue-400 uppercase">
              Customer Intelligence
            </p>

            <h1 className="text-4xl md:text-5xl font-bold mt-3">
              Customer Feedback
            </h1>

            <p className="text-gray-400 mt-3 max-w-2xl">
              Collect, manage, and understand feedback from your
              customers in one place.
            </p>

          </div>


          <Link
            to="/add-feedback"
            className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-semibold"
          >
            + Add Feedback
          </Link>

        </div>


        {/* Search and Filters */}

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 md:p-6 mb-8">

          <div className="flex flex-col lg:flex-row gap-4">

            <input
              type="text"
              placeholder="Search customer feedback..."
              className="flex-1 px-4 py-3 bg-gray-950 border border-gray-700 rounded-lg text-white placeholder-gray-500 outline-none focus:border-blue-500 transition"
            />


            <select
              className="px-4 py-3 bg-gray-950 border border-gray-700 rounded-lg text-gray-300 outline-none focus:border-blue-500 transition"
            >

              <option>
                All Sentiments
              </option>

              <option>
                Positive
              </option>

              <option>
                Neutral
              </option>

              <option>
                Negative
              </option>

            </select>


            <select
              className="px-4 py-3 bg-gray-950 border border-gray-700 rounded-lg text-gray-300 outline-none focus:border-blue-500 transition"
            >

              <option>
                All Sources
              </option>

              <option>
                Support
              </option>

              <option>
                Review
              </option>

              <option>
                Survey
              </option>

              <option>
                Sales Call
              </option>

              <option>
                Community
              </option>

            </select>

          </div>

        </div>


        {/* Statistics */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">

            <p className="text-gray-400 text-sm">
              Total Feedback
            </p>

            <h2 className="text-3xl font-bold mt-3">
              {totalFeedback}
            </h2>

          </div>


          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">

            <p className="text-gray-400 text-sm">
              Positive
            </p>

            <h2 className="text-3xl font-bold text-green-400 mt-3">
              0
            </h2>

          </div>


          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">

            <p className="text-gray-400 text-sm">
              Neutral
            </p>

            <h2 className="text-3xl font-bold text-yellow-400 mt-3">
              0
            </h2>

          </div>


          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">

            <p className="text-gray-400 text-sm">
              Negative
            </p>

            <h2 className="text-3xl font-bold text-red-400 mt-3">
              0
            </h2>

          </div>

        </div>


        {/* Feedback Entries */}

        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">

          <div className="px-6 py-5 border-b border-gray-800">

            <h2 className="text-xl font-semibold">
              Feedback Entries
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Customer feedback collected in your workspace.
            </p>

          </div>


          {/* Loading */}

          {loading && (

            <div className="px-6 py-16 text-center">

              <p className="text-gray-400">
                Loading feedback...
              </p>

            </div>

          )}


          {/* Error */}

          {!loading && error && (

            <div className="px-6 py-16 text-center">

              <p className="text-red-400">
                {error}
              </p>

            </div>

          )}


          {/* Empty State */}

          {!loading &&
            !error &&
            feedbacks.length === 0 && (

              <div className="px-6 py-20 text-center">

                <div className="max-w-md mx-auto">

                  <div className="w-16 h-16 mx-auto rounded-full bg-gray-800 flex items-center justify-center">

                    <span className="text-2xl">
                      💬
                    </span>

                  </div>

                  <h3 className="text-xl font-semibold mt-6">
                    No feedback yet
                  </h3>

                  <p className="text-gray-500 mt-3 leading-relaxed">
                    Start collecting customer feedback to see
                    insights, sentiment, themes, and trends here.
                  </p>

                  <Link
                    to="/add-feedback"
                    className="inline-block mt-6 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-semibold"
                  >
                    Add Your First Feedback
                  </Link>

                </div>

              </div>

            )}


          {/* Feedback List */}

          {!loading &&
            !error &&
            feedbacks.length > 0 && (

              <div className="divide-y divide-gray-800">

                {feedbacks.map((feedback) => (

                  <div
                    key={feedback._id}
                    className="p-6 hover:bg-gray-800/40 transition"
                  >

                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

                      <div>

                        <h3 className="text-lg font-semibold">
                          {feedback.customerName}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          {feedback.customerEmail}
                        </p>

                      </div>


                      <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm w-fit">
                        {feedback.source}
                      </span>

                    </div>


                    <p className="text-gray-300 mt-5 leading-relaxed">
                      {feedback.message}
                    </p>


                    <p className="text-xs text-gray-600 mt-4">
                      {new Date(
                        feedback.createdAt
                      ).toLocaleString()}
                    </p>

                  </div>

                ))}

              </div>

            )}

        </div>

      </div>

    </div>
  );
}

export default FeedbackPage;