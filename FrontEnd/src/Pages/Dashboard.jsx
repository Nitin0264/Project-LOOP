import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [analytics, setAnalytics] = useState({
    totalFeedback: 0,
    sentiment: {
      positive: 0,
      neutral: 0,
      negative: 0,
    },
    themes: [],
    sources: [],
  });

  const [recentFeedback, setRecentFeedback] =
    useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [
          analyticsResponse,
          feedbackResponse,
        ] = await Promise.all([
          fetch(
            "http://localhost:5000/feedback/analytics/overview"
          ),
          fetch(
            "http://localhost:5000/feedback"
          ),
        ]);

        const analyticsData =
          await analyticsResponse.json();

        const feedbackData =
          await feedbackResponse.json();

        if (!analyticsResponse.ok) {
          throw new Error(
            analyticsData.message ||
              "Failed to load analytics"
          );
        }

        if (!feedbackResponse.ok) {
          throw new Error(
            feedbackData.message ||
              "Failed to load feedback"
          );
        }

        setAnalytics(analyticsData);

        setRecentFeedback(
          feedbackData.feedbacks
            ?.slice(0, 5) || []
        );
      } catch (error) {
        console.error(
          "Dashboard error:",
          error
        );

        setError(
          "Unable to load dashboard data."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const total =
    analytics.totalFeedback || 0;

  const positive =
    analytics.sentiment?.positive || 0;

  const neutral =
    analytics.sentiment?.neutral || 0;

  const negative =
    analytics.sentiment?.negative || 0;

  const positivePercentage =
    total > 0
      ? Math.round((positive / total) * 100)
      : 0;

  const neutralPercentage =
    total > 0
      ? Math.round((neutral / total) * 100)
      : 0;

  const negativePercentage =
    total > 0
      ? Math.round((negative / total) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-8 md:px-10 lg:px-12">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

          <div>

            <p className="text-sm font-semibold tracking-wider text-blue-400 uppercase">
              Project LOOP
            </p>

            <h1 className="text-4xl md:text-5xl font-bold mt-3">
              Analytics Dashboard
            </h1>

            <p className="text-gray-400 mt-3 max-w-2xl">
              Understand customer sentiment,
              themes, and feedback sources.
            </p>

          </div>

          <Link
            to="/add-feedback"
            className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-semibold"
          >
            + Add Feedback
          </Link>

        </div>


        {/* Error */}

        {error && (
          <div className="mb-8 px-5 py-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400">
            {error}
          </div>
        )}


        {/* Statistics */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">

            <p className="text-gray-400 text-sm">
              Total Feedback
            </p>

            <h2 className="text-4xl font-bold mt-4">
              {loading ? "..." : total}
            </h2>

            <p className="text-gray-500 text-sm mt-3">
              Total customer responses
            </p>

          </div>


          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">

            <div className="flex justify-between items-center">

              <p className="text-gray-400 text-sm">
                Positive
              </p>

              <span className="w-3 h-3 rounded-full bg-green-400" />

            </div>

            <h2 className="text-4xl font-bold text-green-400 mt-4">
              {loading ? "..." : positive}
            </h2>

            <p className="text-gray-500 text-sm mt-3">
              {positivePercentage}% of feedback
            </p>

          </div>


          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">

            <div className="flex justify-between items-center">

              <p className="text-gray-400 text-sm">
                Neutral
              </p>

              <span className="w-3 h-3 rounded-full bg-yellow-400" />

            </div>

            <h2 className="text-4xl font-bold text-yellow-400 mt-4">
              {loading ? "..." : neutral}
            </h2>

            <p className="text-gray-500 text-sm mt-3">
              {neutralPercentage}% of feedback
            </p>

          </div>


          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">

            <div className="flex justify-between items-center">

              <p className="text-gray-400 text-sm">
                Negative
              </p>

              <span className="w-3 h-3 rounded-full bg-red-400" />

            </div>

            <h2 className="text-4xl font-bold text-red-400 mt-4">
              {loading ? "..." : negative}
            </h2>

            <p className="text-gray-500 text-sm mt-3">
              {negativePercentage}% of feedback
            </p>

          </div>

        </div>


        {/* Analytics */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

          {/* Sentiment */}

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">

            <div className="mb-6">

              <h2 className="text-xl font-semibold">
                Sentiment Overview
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                Distribution of customer sentiment.
              </p>

            </div>


            <div className="space-y-5">

              <div>

                <div className="flex justify-between text-sm mb-2">

                  <span className="text-gray-300">
                    Positive
                  </span>

                  <span className="text-green-400">
                    {positive}
                  </span>

                </div>

                <div className="h-3 bg-gray-800 rounded-full overflow-hidden">

                  <div
                    className="h-full bg-green-400 rounded-full"
                    style={{
                      width: `${positivePercentage}%`,
                    }}
                  />

                </div>

              </div>


              <div>

                <div className="flex justify-between text-sm mb-2">

                  <span className="text-gray-300">
                    Neutral
                  </span>

                  <span className="text-yellow-400">
                    {neutral}
                  </span>

                </div>

                <div className="h-3 bg-gray-800 rounded-full overflow-hidden">

                  <div
                    className="h-full bg-yellow-400 rounded-full"
                    style={{
                      width: `${neutralPercentage}%`,
                    }}
                  />

                </div>

              </div>


              <div>

                <div className="flex justify-between text-sm mb-2">

                  <span className="text-gray-300">
                    Negative
                  </span>

                  <span className="text-red-400">
                    {negative}
                  </span>

                </div>

                <div className="h-3 bg-gray-800 rounded-full overflow-hidden">

                  <div
                    className="h-full bg-red-400 rounded-full"
                    style={{
                      width: `${negativePercentage}%`,
                    }}
                  />

                </div>

              </div>

            </div>

          </div>


          {/* Themes */}

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">

            <div className="mb-6">

              <h2 className="text-xl font-semibold">
                Top Customer Themes
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                Topics appearing most frequently.
              </p>

            </div>


            {analytics.themes.length === 0 ? (

              <p className="text-gray-500">
                No themes available yet.
              </p>

            ) : (

              <div className="space-y-4">

                {analytics.themes
                  .slice(0, 6)
                  .map((theme) => (

                    <div
                      key={theme._id}
                      className="flex items-center justify-between p-4 rounded-xl bg-gray-950 border border-gray-800"
                    >

                      <span className="text-gray-300 capitalize">
                        {theme._id}
                      </span>

                      <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm">
                        {theme.count}
                      </span>

                    </div>

                  ))}

              </div>

            )}

          </div>

        </div>


        {/* Sources */}

        <div className="mt-8 bg-gray-900 border border-gray-800 rounded-2xl p-6">

          <div className="mb-6">

            <h2 className="text-xl font-semibold">
              Feedback Sources
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Where your customer feedback is coming from.
            </p>

          </div>


          {analytics.sources.length === 0 ? (

            <p className="text-gray-500">
              No source data available.
            </p>

          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

              {analytics.sources.map((source) => (

                <div
                  key={source._id}
                  className="p-5 rounded-xl bg-gray-950 border border-gray-800"
                >

                  <p className="text-gray-400 text-sm capitalize">
                    {source._id}
                  </p>

                  <p className="text-3xl font-bold mt-2">
                    {source.count}
                  </p>

                </div>

              ))}

            </div>

          )}

        </div>


        {/* Recent Feedback */}

        <div className="mt-8 bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-5 border-b border-gray-800">

            <div>

              <h2 className="text-xl font-semibold">
                Recent Feedback
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                Latest customer responses.
              </p>

            </div>

            <Link
              to="/feedback"
              className="text-blue-400 hover:text-blue-300 transition text-sm"
            >
              View all →
            </Link>

          </div>


          {recentFeedback.length === 0 ? (

            <div className="p-10 text-center text-gray-500">
              No feedback available.
            </div>

          ) : (

            <div className="divide-y divide-gray-800">

              {recentFeedback.map((feedback) => (

                <div
                  key={feedback._id}
                  className="p-6 hover:bg-gray-800/40 transition"
                >

                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

                    <div>

                      <h3 className="font-semibold">
                        {feedback.customerName}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {feedback.customerEmail}
                      </p>

                    </div>

                    <div className="flex flex-wrap gap-3">

                      <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm">
                        {feedback.source}
                      </span>

                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          feedback.sentiment === "positive"
                            ? "bg-green-500/10 text-green-400"
                            : feedback.sentiment === "negative"
                            ? "bg-red-500/10 text-red-400"
                            : "bg-yellow-500/10 text-yellow-400"
                        }`}
                      >
                        {feedback.sentiment
                          ? feedback.sentiment
                              .charAt(0)
                              .toUpperCase() +
                            feedback.sentiment.slice(1)
                          : "Neutral"}
                      </span>

                    </div>

                  </div>

                  <p className="text-gray-300 mt-4 leading-relaxed">
                    {feedback.message}
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

export default Dashboard;