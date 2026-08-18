import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function Dashboard() {

  const navigate = useNavigate();

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


  // ==================================================
  // FETCH ANALYTICS
  // ==================================================

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
          data.message ||
          "Failed to fetch analytics"
        );

      }

      setAnalytics({

        totalFeedback:
          data?.totalFeedback || 0,

        sentiment: {

          positive:
            data?.sentiment?.positive || 0,

          negative:
            data?.sentiment?.negative || 0,

          neutral:
            data?.sentiment?.neutral || 0,

        },

        themes:
          Array.isArray(data?.themes)
            ? data.themes
            : [],

        recentFeedback:
          Array.isArray(data?.recentFeedback)
            ? data.recentFeedback
            : [],

      });

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


  // ==================================================
  // SENTIMENT DATA
  // ==================================================

  const total =
    analytics?.totalFeedback || 0;

  const positive =
    analytics?.sentiment?.positive || 0;

  const negative =
    analytics?.sentiment?.negative || 0;

  const neutral =
    analytics?.sentiment?.neutral || 0;


  const positivePercentage =
    total > 0
      ? Math.round(
          (positive / total) * 100
        )
      : 0;


  const negativePercentage =
    total > 0
      ? Math.round(
          (negative / total) * 100
        )
      : 0;


  const neutralPercentage =
    total > 0
      ? Math.round(
          (neutral / total) * 100
        )
      : 0;


  // ==================================================
  // CHART DATA
  // ==================================================

  const sentimentChartData = [

    {
      name: "Positive",
      value: positive,
    },

    {
      name: "Negative",
      value: negative,
    },

    {
      name: "Neutral",
      value: neutral,
    },

  ];


  const themeChartData =
    Array.isArray(analytics?.themes)

      ? analytics.themes.map(
          (item) => ({

            name:
              item?.theme ||
              "Unknown",

            count:
              item?.count || 0,

          })
        )

      : [];


  const pieColors = [

    "#22c55e",

    "#ef4444",

    "#eab308",

  ];


  // ==================================================
  // LOADING
  // ==================================================

  if (loading) {

    return (

      <div className="min-h-screen bg-gray-950 px-6 py-10 text-white sm:px-8 lg:px-12">

        <div className="mx-auto max-w-7xl">

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-12 text-center">

            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-gray-700 border-t-blue-500" />

            <p className="text-gray-400">
              Loading dashboard analytics...
            </p>

          </div>

        </div>

      </div>

    );

  }


  // ==================================================
  // DASHBOARD
  // ==================================================

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


          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

            <div>

              <h1 className="text-3xl font-bold sm:text-4xl">
                Analytics Dashboard
              </h1>

              <p className="mt-3 max-w-2xl text-gray-400">
                Understand your customer feedback using
                AI-powered insights and analytics.
              </p>

            </div>


            {/* ==================================================
                ACTION BUTTONS
            ================================================== */}

            <div className="flex flex-wrap items-center gap-3">


              {/* ADD FEEDBACK */}

              <button
                type="button"
                onClick={() =>
                  navigate("/add-feedback")
                }
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >

                <span className="text-xl leading-none">
                  +
                </span>

                Add Feedback

              </button>


              {/* REFRESH */}

              <button
                type="button"
                onClick={fetchAnalytics}
                className="rounded-xl border border-gray-700 bg-gray-900 px-5 py-3 text-sm font-medium text-gray-200 transition hover:border-blue-500 hover:bg-gray-800"
              >

                Refresh Analytics

              </button>

            </div>

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


          {/* TOTAL */}

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


          {/* POSITIVE */}

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


          {/* NEGATIVE */}

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


          {/* NEUTRAL */}

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
            CHART SECTION
        ================================================== */}

        <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">


          {/* SENTIMENT BAR CHART */}

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-lg sm:p-7">

            <div className="mb-7">

              <h2 className="text-xl font-semibold">
                Sentiment Distribution
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                AI-classified customer sentiment.
              </p>

            </div>


            <div className="h-[320px] w-full">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <BarChart
                  data={sentimentChartData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: -15,
                    bottom: 10,
                  }}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#1f2937"
                  />

                  <XAxis
                    dataKey="name"
                    stroke="#9ca3af"
                    tickLine={false}
                    axisLine={false}
                  />

                  <YAxis
                    stroke="#9ca3af"
                    tickLine={false}
                    axisLine={false}
                    allowDecimals={false}
                  />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111827",
                      border: "1px solid #374151",
                      borderRadius: "12px",
                      color: "#fff",
                    }}
                  />

                  <Bar
                    dataKey="value"
                    radius={[
                      8,
                      8,
                      0,
                      0,
                    ]}
                  >

                    {sentimentChartData.map(
                      (entry, index) => (

                        <Cell
                          key={`cell-${index}`}
                          fill={
                            pieColors[index]
                          }
                        />

                      )
                    )}

                  </Bar>

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>


          {/* SENTIMENT PIE CHART */}

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-lg sm:p-7">

            <div className="mb-7">

              <h2 className="text-xl font-semibold">
                Sentiment Breakdown
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Percentage of feedback by sentiment.
              </p>

            </div>


            <div className="h-[320px] w-full">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <PieChart>

                  <Pie
                    data={sentimentChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={105}
                    innerRadius={65}
                    paddingAngle={3}
                  >

                    {sentimentChartData.map(
                      (entry, index) => (

                        <Cell
                          key={`pie-${index}`}
                          fill={
                            pieColors[index]
                          }
                        />

                      )
                    )}

                  </Pie>

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111827",
                      border: "1px solid #374151",
                      borderRadius: "12px",
                      color: "#fff",
                    }}
                  />

                </PieChart>

              </ResponsiveContainer>

            </div>


            <div className="mt-2 grid grid-cols-3 gap-3">

              <div className="rounded-xl bg-gray-950 p-3 text-center">

                <div className="mx-auto mb-2 h-2.5 w-2.5 rounded-full bg-green-500" />

                <p className="text-xs text-gray-500">
                  Positive
                </p>

                <p className="mt-1 font-semibold text-green-400">
                  {positivePercentage}%
                </p>

              </div>


              <div className="rounded-xl bg-gray-950 p-3 text-center">

                <div className="mx-auto mb-2 h-2.5 w-2.5 rounded-full bg-red-500" />

                <p className="text-xs text-gray-500">
                  Negative
                </p>

                <p className="mt-1 font-semibold text-red-400">
                  {negativePercentage}%
                </p>

              </div>


              <div className="rounded-xl bg-gray-950 p-3 text-center">

                <div className="mx-auto mb-2 h-2.5 w-2.5 rounded-full bg-yellow-500" />

                <p className="text-xs text-gray-500">
                  Neutral
                </p>

                <p className="mt-1 font-semibold text-yellow-400">
                  {neutralPercentage}%
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* ==================================================
            THEME ANALYTICS
        ================================================== */}

        <div className="mt-8 rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-lg sm:p-7">

          <div className="mb-7">

            <h2 className="text-xl font-semibold">
              AI Feedback Themes
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              The most common topics identified by Gemini.
            </p>

          </div>


          {themeChartData.length === 0 ? (

            <div className="rounded-xl border border-gray-800 bg-gray-950 p-10 text-center text-sm text-gray-500">
              No themes available yet.
            </div>

          ) : (

            <div className="h-[350px] w-full">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <BarChart
                  data={themeChartData}
                  layout="vertical"
                  margin={{
                    top: 10,
                    right: 20,
                    left: 30,
                    bottom: 10,
                  }}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#1f2937"
                  />

                  <XAxis
                    type="number"
                    allowDecimals={false}
                    stroke="#9ca3af"
                    tickLine={false}
                    axisLine={false}
                  />

                  <YAxis
                    type="category"
                    dataKey="name"
                    width={120}
                    stroke="#9ca3af"
                    tickLine={false}
                    axisLine={false}
                    tick={{
                      fontSize: 12,
                    }}
                  />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111827",
                      border: "1px solid #374151",
                      borderRadius: "12px",
                      color: "#fff",
                    }}
                  />

                  <Bar
                    dataKey="count"
                    fill="#3b82f6"
                    radius={[
                      0,
                      8,
                      8,
                      0,
                    ]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          )}

        </div>


        {/* ==================================================
            AI INSIGHTS
        ================================================== */}

        <div className="mt-8 rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-lg sm:p-7">

          <div className="mb-7 flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 font-bold text-blue-400">
              AI
            </div>

            <div>

              <h2 className="text-xl font-semibold">
                AI Insights
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Quick intelligence from your feedback data.
              </p>

            </div>

          </div>


          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

            <div className="rounded-xl border border-gray-800 bg-gray-950 p-5">

              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Feedback Volume
              </p>

              <p className="mt-3 text-2xl font-bold">
                {total}
              </p>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Total feedback entries analyzed by Project LOOP.
              </p>

            </div>


            <div className="rounded-xl border border-gray-800 bg-gray-950 p-5">

              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Dominant Sentiment
              </p>

              <p className="mt-3 text-2xl font-bold capitalize">

                {positive >= negative &&
                positive >= neutral

                  ? "Positive"

                  : negative >= positive &&
                    negative >= neutral

                  ? "Negative"

                  : "Neutral"}

              </p>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Based on current AI sentiment analysis.
              </p>

            </div>


            <div className="rounded-xl border border-gray-800 bg-gray-950 p-5">

              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Top Theme
              </p>

              <p className="mt-3 text-2xl font-bold capitalize">

                {analytics?.themes?.[0]?.theme ||
                  "No data"}

              </p>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Most frequently detected feedback topic.
              </p>

            </div>

          </div>

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


          {!Array.isArray(
            analytics?.recentFeedback
          ) ||
          analytics.recentFeedback.length === 0 ? (

            <div className="rounded-xl border border-gray-800 bg-gray-950 p-10 text-center text-sm text-gray-500">

              No recent feedback available.

            </div>

          ) : (

            <div className="space-y-4">

              {analytics.recentFeedback.map(
                (feedback, index) => (

                  <div
                    key={
                      feedback?._id ||
                      `feedback-${index}`
                    }
                    className="rounded-xl border border-gray-800 bg-gray-950 p-5 transition hover:border-gray-700"
                  >

                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

                      <div>

                        <h3 className="font-semibold text-white">
                          {feedback?.customerName ||
                            "Anonymous"}
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-gray-400">
                          {feedback?.message ||
                            "No message content."}
                        </p>

                      </div>


                      <span
                        className={`w-fit rounded-full border px-3 py-1 text-xs font-semibold capitalize ${
                          feedback?.sentiment ===
                          "positive"

                            ? "border-green-500/20 bg-green-500/10 text-green-400"

                            : feedback?.sentiment ===
                              "negative"

                            ? "border-red-500/20 bg-red-500/10 text-red-400"

                            : "border-yellow-500/20 bg-yellow-500/10 text-yellow-400"
                        }`}
                      >

                        {feedback?.sentiment ||
                          "unknown"}

                      </span>

                    </div>


                    {feedback?.summary && (

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

