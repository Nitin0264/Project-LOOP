```jsx
import React, { useEffect, useState } from "react";

function Dashboard() {
  const [analytics, setAnalytics] = useState({
    totalFeedback: 0,

    sentiment: {
      positive: 0,
      negative: 0,
      neutral: 0,
    },

    themes: [],

    recentFeedback: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // --------------------------------------------------
  // Fetch analytics
  // --------------------------------------------------

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/feedback/analytics"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch analytics"
        );
      }

      setAnalytics(data);
    } catch (error) {
      console.error(
        "Analytics fetch error:",
        error
      );

      setError(
        "Unable to load dashboard analytics."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  // --------------------------------------------------
  // Calculate sentiment percentage
  // --------------------------------------------------

  const total =
    analytics.totalFeedback || 0;

  const positive =
    analytics.sentiment?.positive || 0;

  const negative =
    analytics.sentiment?.negative || 0;

  const neutral =
    analytics.sentiment?.neutral || 0;

  const positivePercentage =
    total > 0
      ? Math.round((positive / total) * 100)
      : 0;

  const negativePercentage =
    total > 0
      ? Math.round((negative / total) * 100)
      : 0;

  const neutralPercentage =
    total > 0
      ? Math.round((neutral / total) * 100)
      : 0;

  // --------------------------------------------------
  // Loading
  // --------------------------------------------------

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 px-6 py-10 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-10 text-center">

            <p className="text-gray-400">
              Loading dashboard analytics...
            </p>

          </div>

        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // Dashboard
  // --------------------------------------------------

  return (
    <div className="min-h-screen bg-gray-950 px-6 py-10 text-white sm:px-8 lg:px-12">

      <div className="mx-auto max-w-7xl">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="mb-10">

          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-400">
            Project LOOP
          </p>

          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

            <div>

              <h1 className="text-3xl font-bold sm:text-4xl">
                Analytics Dashboard
              </h1>

              <p className="mt-3 max-w-2xl text-gray-400">
                Understand your customer feedback using
                AI-powered insights and analytics.
              </p>

            </div>

            <button
              onClick={fetchAnalytics}
              className="w-fit rounded-xl border border-gray-700 bg-gray-900 px-5 py-3 text-sm font-medium text-gray-200 transition hover:border-blue-500 hover:bg-gray-800"
            >
              Refresh Analytics
            </button>

          </div>

        </div>


        {/* ==================================================
            ERROR
        ================================================== */}

        {error && (
          <div className="mb-8 rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-400">
            {error}
          </div>
        )}


        {/* ==================================================
            STAT CARDS
        ================================================== */}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

          {/* Total */}

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-lg">

            <p className="text-sm font-medium text-gray-400">
              Total Feedback
            </p>

            <div className="mt-4 flex items-end justify-between">

              <h2 className="text-4xl font-bold">
                {total}
              </h2>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                F
              </div>

            </div>

            <p className="mt-4 text-xs text-gray-500">
              All customer feedback
            </p>

          </div>


          {/* Positive */}

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-lg">

            <p className="text-sm font-medium text-gray-400">
              Positive Feedback
            </p>

            <div className="mt-4 flex items-end justify-between">

              <h2 className="text-4xl font-bold text-green-400">
                {positive}
              </h2>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
                +
              </div>

            </div>

            <p className="mt-4 text-xs text-gray-500">
              {positivePercentage}% of total feedback
            </p>

          </div>


          {/* Negative */}

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-lg">

            <p className="text-sm font-medium text-gray-400">
              Negative Feedback
            </p>

            <div className="mt-4 flex items-end justify-between">

              <h2 className="text-4xl font-bold text-red-400">
                {negative}
              </h2>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                -
              </div>

            </div>

            <p className="mt-4 text-xs text-gray-500">
              {negativePercentage}% of total feedback
            </p>

          </div>


          {/* Neutral */}

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-lg">

            <p className="text-sm font-medium text-gray-400">
              Neutral Feedback
            </p>

            <div className="mt-4 flex items-end justify-between">

              <h2 className="text-4xl font-bold text-yellow-400">
                {neutral}
              </h2>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-400">
                =
              </div>

            </div>

            <p className="mt-4 text-xs text-gray-500">
              {neutralPercentage}% of total feedback
            </p>

          </div>

        </div>


        {/* ==================================================
            SENTIMENT OVERVIEW
        ================================================== */}

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* Sentiment */}

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-lg sm:p-7">

            <div className="mb-7">

              <h2 className="text-xl font-semibold">
                Sentiment Overview
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                AI-classified customer sentiment.
              </p>

            </div>


            {/* Positive */}

            <div className="mb-6">

              <div className="mb-2 flex items-center justify-between">

                <span className="text-sm text-gray-300">
                  Positive
                </span>

                <span className="text-sm font-semibold text-green-400">
                  {positive} ({positivePercentage}%)
                </span>

              </div>

              <div className="h-3 overflow-hidden rounded-full bg-gray-800">

                <div
                  className="h-full rounded-full bg-green-500"
                  style={{
                    width: `${positivePercentage}%`,
                  }}
                />

              </div>

            </div>


            {/* Negative */}

            <div className="mb-6">

              <div className="mb-2 flex items-center justify-between">

                <span className="text-sm text-gray-300">
                  Negative
                </span>

                <span className="text-sm font-semibold text-red-400">
                  {negative} ({negativePercentage}%)
                </span>

              </div>

              <div className="h-3 overflow-hidden rounded-full bg-gray-800">

                <div
                  className="h-full rounded-full bg-red-500"
                  style={{
                    width: `${negativePercentage}%`,
                  }}
                />

              </div>

            </div>


            {/* Neutral */}

            <div>

              <div className="mb-2 flex items-center justify-between">

                <span className="text-sm text-gray-300">
                  Neutral
                </span>

                <span className="text-sm font-semibold text-yellow-400">
                  {neutral} ({neutralPercentage}%)
                </span>

              </div>

              <div className="h-3 overflow-hidden rounded-full bg-gray-800">

                <div
                  className="h-full rounded-full bg-yellow-500"
                  style={{
                    width: `${neutralPercentage}%`,
                  }}
                />

              </div>

            </div>

          </div>


          {/* ==================================================
              AI SUMMARY
          ================================================== */}

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-lg sm:p-7">

            <div className="mb-7">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 font-semibold text-blue-400">
                  AI
                </div>

                <div>

                  <h2 className="text-xl font-semibold">
                    AI Insights
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Customer intelligence from Project LOOP.
                  </p>

                </div>

              </div>

            </div>


            <div className="space-y-5">

              <div className="rounded-xl border border-gray-800 bg-gray-950 p-5">

                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Feedback Volume
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-300">
                  Project LOOP has analyzed{" "}
                  <span className="font-semibold text-white">
                    {total}
                  </span>{" "}
                  customer feedback entries.
                </p>

              </div>


              <div className="rounded-xl border border-gray-800 bg-gray-950 p-5">

                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Dominant Sentiment
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-300">

                  {positive >= negative &&
                  positive >= neutral ? (
                    <>
                      Positive feedback is currently the
                      dominant sentiment.
                    </>
                  ) : negative >= positive &&
                    negative >= neutral ? (
                    <>
                      Negative feedback is currently the
                      dominant sentiment.
                    </>
                  ) : (
                    <>
                      Neutral feedback is currently the
                      dominant sentiment.
                    </>
                  )}

                </p>

              </div>

            </div>

          </div>

        </div>


        {/* ==================================================
            TOP THEMES
        ================================================== */}

        <div className="mt-8 rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-lg sm:p-7">

          <div className="mb-7">

            <h2 className="text-xl font-semibold">
              Top Feedback Themes
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Themes automatically identified by Gemini AI.
            </p>

          </div>


          {analytics.themes.length === 0 ? (

            <div className="rounded-xl border border-gray-800 bg-gray-950 p-8 text-center text-sm text-gray-500">
              No themes available yet.
            </div>

          ) : (

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {analytics.themes.map(
                (item, index) => {

                  const maxCount =
                    analytics.themes[0]?.count || 1;

                  const width =
                    Math.max(
                      (item.count / maxCount) * 100,
                      8
                    );

                  return (
                    <div
                      key={`${item.theme}-${index}`}
                      className="rounded-xl border border-gray-800 bg-gray-950 p-5"
                    >

                      <div className="flex items-center justify-between gap-4">

                        <p className="font-medium capitalize text-gray-200">
                          {item.theme}
                        </p>

                        <span className="rounded-lg bg-blue-500/10 px-2.5 py-1 text-xs font-semibold text-blue-400">
                          {item.count}
                        </span>

                      </div>


                      <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-800">

                        <div
                          className="h-full rounded-full bg-blue-500"
                          style={{
                            width: `${width}%`,
                          }}
                        />

                      </div>

                    </div>
                  );
                }
              )}

            </div>

          )}

        </div>


        {/* ==================================================
            RECENT FEEDBACK
        ================================================== */}

        <div className="mt-8 rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-lg sm:p-7">

          <div className="mb-7">

            <h2 className="text-xl font-semibold">
              Recent Feedback
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Latest customer feedback analyzed by AI.
            </p>

          </div>


          {analytics.recentFeedback.length === 0 ? (

            <div className="rounded-xl border border-gray-800 bg-gray-950 p-8 text-center text-sm text-gray-500">
              No recent feedback available.
            </div>

          ) : (

            <div className="space-y-4">

              {analytics.recentFeedback.map(
                (feedback) => (

                  <div
                    key={feedback._id}
                    className="rounded-xl border border-gray-800 bg-gray-950 p-5"
                  >

                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

                      <div>

                        <h3 className="font-semibold text-white">
                          {feedback.customerName}
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-gray-400">
                          {feedback.message}
                        </p>

                      </div>


                      <span
                        className={`w-fit rounded-full border px-3 py-1 text-xs font-semibold capitalize ${
                          feedback.sentiment === "positive"
                            ? "border-green-500/20 bg-green-500/10 text-green-400"
                            : feedback.sentiment === "negative"
                            ? "border-red-500/20 bg-red-500/10 text-red-400"
                            : "border-yellow-500/20 bg-yellow-500/10 text-yellow-400"
                        }`}
                      >
                        {feedback.sentiment || "unknown"}
                      </span>

                    </div>


                    {feedback.summary && (

                      <div className="mt-4 border-t border-gray-800 pt-4">

                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                          AI Summary
                        </p>

                        <p className="mt-2 text-sm leading-6 text-gray-400">
                          {feedback.summary}
                        </p>

                      </div>

                    )}

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
```
