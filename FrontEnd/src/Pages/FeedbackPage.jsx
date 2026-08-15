import React, { useEffect, useState } from "react";

function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    message: "",
    source: "website",
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // --------------------------------------------------
  // Fetch feedback
  // --------------------------------------------------

  const fetchFeedbacks = async () => {
    try {
      setFetching(true);

      const response = await fetch(
        "http://localhost:5000/feedback"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch feedback"
        );
      }

      setFeedbacks(data.feedbacks || []);
    } catch (error) {
      console.error("Fetch feedback error:", error);
      setError("Unable to load feedback.");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // --------------------------------------------------
  // Handle input changes
  // --------------------------------------------------

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // --------------------------------------------------
  // Submit feedback
  // --------------------------------------------------

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/feedback",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to submit feedback"
        );
      }

      setMessage(
        "Feedback submitted successfully! AI analysis has been completed."
      );

      setFormData({
        customerName: "",
        customerEmail: "",
        message: "",
        source: "website",
      });

      fetchFeedbacks();
    } catch (error) {
      console.error("Submit feedback error:", error);

      setError(
        error.message || "Unable to submit feedback."
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // Delete feedback
  // --------------------------------------------------

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this feedback?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/feedback/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete feedback"
        );
      }

      setMessage("Feedback deleted successfully.");

      fetchFeedbacks();
    } catch (error) {
      console.error("Delete feedback error:", error);

      setError(
        error.message || "Unable to delete feedback."
      );
    }
  };

  // --------------------------------------------------
  // Sentiment styling
  // --------------------------------------------------

  const getSentimentStyle = (sentiment) => {
    if (sentiment === "positive") {
      return "bg-green-500/10 text-green-400 border-green-500/20";
    }

    if (sentiment === "negative") {
      return "bg-red-500/10 text-red-400 border-red-500/20";
    }

    return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-400">
            Project LOOP
          </p>

          <h1 className="text-3xl font-bold sm:text-4xl">
            Customer Feedback
          </h1>

          <p className="mt-3 max-w-2xl text-gray-400">
            Collect customer feedback and automatically analyze
            it using AI-powered insights.
          </p>
        </div>


        {/* Success Message */}

        {message && (
          <div className="mb-6 rounded-xl border border-green-500/20 bg-green-500/10 px-5 py-4 text-sm text-green-400">
            {message}
          </div>
        )}


        {/* Error Message */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-400">
            {error}
          </div>
        )}


        {/* Feedback Form */}

        <div className="mb-12 rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-xl sm:p-8">

          <div className="mb-7">
            <h2 className="text-2xl font-semibold">
              Submit Feedback
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              Your feedback will automatically be analyzed by
              Project LOOP AI.
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

              {/* Customer Name */}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Customer Name
                </label>

                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                  placeholder="Enter customer name"
                  className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>


              {/* Customer Email */}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Customer Email
                </label>

                <input
                  type="email"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleChange}
                  placeholder="Enter customer email"
                  className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>


              {/* Source */}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Feedback Source
                </label>

                <select
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="website">
                    Website
                  </option>

                  <option value="manual">
                    Manual
                  </option>

                  <option value="survey">
                    Survey
                  </option>

                  <option value="email">
                    Email
                  </option>
                </select>
              </div>

            </div>


            {/* Feedback */}

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Feedback
              </label>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                placeholder="Enter customer feedback..."
                className="w-full resize-none rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>


            {/* Submit */}

            <div className="mt-7 flex justify-end">

              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Analyzing..."
                  : "Submit Feedback"}
              </button>

            </div>

          </form>
        </div>


        {/* Recent Feedback */}

        <div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold">
              Recent Feedback
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              AI-analyzed customer feedback stored in Project LOOP.
            </p>
          </div>


          {fetching ? (
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-10 text-center text-gray-400">
              Loading feedback...
            </div>
          ) : feedbacks.length === 0 ? (
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-10 text-center text-gray-400">
              No feedback available yet.
            </div>
          ) : (
            <div className="space-y-6">

              {feedbacks.map((feedback) => (

                <div
                  key={feedback._id}
                  className="rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-lg sm:p-7"
                >

                  {/* Top Row */}

                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {feedback.customerName}
                      </h3>

                      {feedback.customerEmail && (
                        <p className="mt-1 text-sm text-gray-500">
                          {feedback.customerEmail}
                        </p>
                      )}
                    </div>


                    <div className="flex items-center gap-3">

                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize ${getSentimentStyle(
                          feedback.sentiment
                        )}`}
                      >
                        {feedback.sentiment || "unknown"}
                      </span>

                      <button
                        onClick={() =>
                          handleDelete(feedback._id)
                        }
                        className="rounded-lg border border-red-500/20 px-3 py-1.5 text-xs font-medium text-red-400 transition hover:bg-red-500/10"
                      >
                        Delete
                      </button>

                    </div>

                  </div>


                  {/* Original Feedback */}

                  <div className="mt-6 rounded-xl border border-gray-800 bg-gray-950 p-5">

                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Customer Feedback
                    </p>

                    <p className="leading-7 text-gray-300">
                      {feedback.message}
                    </p>

                  </div>


                  {/* AI Analysis */}

                  <div className="mt-6">

                    <div className="mb-4 flex items-center gap-3">

                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                        AI
                      </div>

                      <div>
                        <h4 className="font-semibold text-white">
                          AI Analysis
                        </h4>

                        <p className="text-xs text-gray-500">
                          Generated by Project LOOP AI
                        </p>
                      </div>

                    </div>


                    {/* Themes */}

                    {feedback.themes &&
                      feedback.themes.length > 0 && (
                        <div className="mb-5">

                          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Main Themes
                          </p>

                          <div className="flex flex-wrap gap-2">

                            {feedback.themes.map(
                              (theme, index) => (
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


                    {/* Summary */}

                    {feedback.summary && (
                      <div className="mb-5">

                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Summary
                        </p>

                        <p className="leading-7 text-gray-300">
                          {feedback.summary}
                        </p>

                      </div>
                    )}


                    {/* Key Issue */}

                    {feedback.keyIssue && (
                      <div className="mb-5">

                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Key Issue
                        </p>

                        <p className="leading-7 text-gray-300">
                          {feedback.keyIssue}
                        </p>

                      </div>
                    )}


                    {/* Recommendation */}

                    {feedback.recommendation && (
                      <div>

                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Recommendation
                        </p>

                        <p className="leading-7 text-gray-300">
                          {feedback.recommendation}
                        </p>

                      </div>
                    )}

                  </div>

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