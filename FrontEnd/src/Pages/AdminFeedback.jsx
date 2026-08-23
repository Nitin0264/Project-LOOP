import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function getSentimentStyle(sentiment) {
  if (sentiment === "positive") {
    return "border-green-500/20 bg-green-500/10 text-green-400";
  }

  if (sentiment === "negative") {
    return "border-red-500/20 bg-red-500/10 text-red-400";
  }

  return "border-yellow-500/20 bg-yellow-500/10 text-yellow-400";
}

function AdminFeedbackPage() {
  const navigate = useNavigate();

  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState("");

  // =====================================================
  // FETCH ADMIN FEEDBACK
  // =====================================================

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api(
        "/admin/feedback"
      );

      if (
        response.status === 401 ||
        response.status === 403
      ) {
        setError(
          "You do not have permission to manage feedback."
        );
        return;
      }

      if (!response.ok || !response.success) {
        throw new Error(
          response.message ||
            "Unable to load feedback."
        );
      }

      setFeedback(
        Array.isArray(response.feedback)
          ? response.feedback
          : []
      );
    } catch (error) {
      console.error(
        "Admin feedback error:",
        error
      );

      setError(
        error.message ||
          "Unable to load feedback."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    fetchFeedback();
  }, []);

  // =====================================================
  // DELETE FEEDBACK
  // =====================================================

  const handleDelete = async (
    feedbackId,
    customerName
  ) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the feedback from ${customerName}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setActionLoading(feedbackId);
      setError("");

      const response = await api(
        `/admin/feedback/${feedbackId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok || !response.success) {
        throw new Error(
          response.message ||
            "Unable to delete feedback."
        );
      }

      await fetchFeedback();
    } catch (error) {
      console.error(
        "Admin delete feedback error:",
        error
      );

      setError(
        error.message ||
          "Unable to delete feedback."
      );
    } finally {
      setActionLoading("");
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 px-6 py-10 text-white sm:px-8 lg:px-12">

        <div className="mx-auto max-w-7xl">

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-12 text-center">

            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-gray-700 border-t-blue-500" />

            <p className="text-gray-400">
              Loading feedback...
            </p>

          </div>

        </div>

      </div>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="min-h-screen bg-gray-950 px-6 py-10 text-white sm:px-8 lg:px-12">

      <div className="mx-auto max-w-7xl">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

          <div>

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-red-400">
              Project LOOP
            </p>

            <h1 className="text-3xl font-bold sm:text-4xl">
              Feedback Management
            </h1>

            <p className="mt-3 max-w-2xl text-gray-400">
              Review and manage customer feedback
              across the LOOP workspace.
            </p>

          </div>


          <div className="flex gap-3">

            <button
              type="button"
              onClick={() =>
                navigate("/admin")
              }
              className="rounded-xl border border-gray-700 bg-gray-900 px-5 py-3 text-sm font-semibold text-gray-300 transition hover:border-blue-500 hover:text-blue-400"
            >
              Admin Dashboard
            </button>

            <button
              type="button"
              onClick={fetchFeedback}
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Refresh
            </button>

          </div>

        </div>


        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="mb-8 rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-400">
            {error}
          </div>
        )}


        {/* =================================================
            SUMMARY
        ================================================= */}

        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-3">

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">

            <p className="text-sm text-gray-500">
              Total Feedback
            </p>

            <p className="mt-3 text-3xl font-bold">
              {feedback.length}
            </p>

          </div>


          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">

            <p className="text-sm text-gray-500">
              Positive
            </p>

            <p className="mt-3 text-3xl font-bold text-green-400">
              {
                feedback.filter(
                  (item) =>
                    item.sentiment ===
                    "positive"
                ).length
              }
            </p>

          </div>


          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">

            <p className="text-sm text-gray-500">
              Negative
            </p>

            <p className="mt-3 text-3xl font-bold text-red-400">
              {
                feedback.filter(
                  (item) =>
                    item.sentiment ===
                    "negative"
                ).length
              }
            </p>

          </div>

        </div>


        {/* =================================================
            FEEDBACK LIST
        ================================================= */}

        {feedback.length === 0 ? (

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-12 text-center">

            <h2 className="text-xl font-semibold">
              No feedback found
            </h2>

            <p className="mt-3 text-sm text-gray-500">
              There is currently no customer feedback
              available.
            </p>

          </div>

        ) : (

          <div className="space-y-6">

            {feedback.map((item) => {

              const isLoading =
                actionLoading === item._id;

              return (
                <div
                  key={item._id}
                  className="rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-lg sm:p-7"
                >

                  {/* =========================================
                      TOP
                  ========================================= */}

                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

                    <div>

                      <h2 className="text-lg font-semibold text-white">
                        {item.customerName}
                      </h2>

                      {item.customerEmail && (
                        <p className="mt-1 text-sm text-gray-500">
                          {item.customerEmail}
                        </p>
                      )}

                      <p className="mt-1 text-xs text-gray-600">
                        Source:{" "}
                        {item.source ||
                          "Unknown"}
                      </p>

                    </div>


                    <div className="flex items-center gap-3">

                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize ${getSentimentStyle(
                          item.sentiment
                        )}`}
                      >
                        {item.sentiment ||
                          "unknown"}
                      </span>

                      <button
                        type="button"
                        disabled={isLoading}
                        onClick={() =>
                          handleDelete(
                            item._id,
                            item.customerName
                          )
                        }
                        className="rounded-lg border border-red-500/20 px-3 py-2 text-xs font-semibold text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        {isLoading
                          ? "Deleting..."
                          : "Delete"}
                      </button>

                    </div>

                  </div>


                  {/* =========================================
                      CUSTOMER FEEDBACK
                  ========================================= */}

                  <div className="mt-6 rounded-xl border border-gray-800 bg-gray-950 p-5">

                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Customer Feedback
                    </p>

                    <p className="leading-7 text-gray-300">
                      {item.message}
                    </p>

                  </div>


                  {/* =========================================
                      AI ANALYSIS
                  ========================================= */}

                  <div className="mt-6">

                    <div className="mb-5 flex items-center gap-3">

                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-sm font-bold text-blue-400">
                        AI
                      </div>

                      <div>

                        <h3 className="font-semibold text-white">
                          AI Analysis
                        </h3>

                        <p className="text-xs text-gray-500">
                          Project LOOP AI
                        </p>

                      </div>

                    </div>


                    {/* THEMES */}

                    {Array.isArray(
                      item.themes
                    ) &&
                      item.themes.length > 0 && (
                        <div className="mb-5">

                          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Main Themes
                          </p>

                          <div className="flex flex-wrap gap-2">

                            {item.themes.map(
                              (
                                theme,
                                index
                              ) => (
                                <span
                                  key={index}
                                  className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-xs text-blue-400"
                                >
                                  {theme}
                                </span>
                              )
                            )}

                          </div>

                        </div>
                      )}


                    {/* SUMMARY */}

                    {item.summary && (
                      <div className="mb-5">

                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Summary
                        </p>

                        <p className="leading-7 text-gray-300">
                          {item.summary}
                        </p>

                      </div>
                    )}


                    {/* KEY ISSUE */}

                    {item.keyIssue && (
                      <div className="mb-5">

                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Key Issue
                        </p>

                        <p className="leading-7 text-gray-300">
                          {item.keyIssue}
                        </p>

                      </div>
                    )}


                    {/* RECOMMENDATION */}

                    {item.recommendation && (
                      <div>

                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Recommendation
                        </p>

                        <p className="leading-7 text-gray-300">
                          {item.recommendation}
                        </p>

                      </div>
                    )}

                  </div>


                  {/* DATE */}

                  <div className="mt-6 border-t border-gray-800 pt-4 text-xs text-gray-600">

                    Created:{" "}
                    {item.createdAt
                      ? new Date(
                          item.createdAt
                        ).toLocaleString()
                      : "N/A"}

                  </div>

                </div>
              );

            })}

          </div>

        )}


        {/* =================================================
            NAVIGATION
        ================================================= */}

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">

          <button
            type="button"
            onClick={() =>
              navigate("/admin/users")
            }
            className="rounded-xl border border-gray-800 bg-gray-900 p-5 text-left transition hover:border-blue-500/40"
          >

            <p className="font-semibold">
              Manage Users
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Manage users and their roles.
            </p>

          </button>


          <button
            type="button"
            onClick={() =>
              navigate("/admin")
            }
            className="rounded-xl border border-gray-800 bg-gray-900 p-5 text-left transition hover:border-blue-500/40"
          >

            <p className="font-semibold">
              Admin Dashboard
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Return to the main admin dashboard.
            </p>

          </button>

        </div>


        <div className="h-16" />

      </div>

    </div>
  );
}

export default AdminFeedbackPage;