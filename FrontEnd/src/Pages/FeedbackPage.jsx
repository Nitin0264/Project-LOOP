import React, { useEffect, useMemo, useState } from "react";

function FeedbackPage() {
  // =====================================================
  // STATE
  // =====================================================

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

  // Search / filters
  const [searchTerm, setSearchTerm] = useState("");
  const [sentimentFilter, setSentimentFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  // =====================================================
  // FETCH FEEDBACK
  // =====================================================

  const fetchFeedbacks = async () => {
    try {
      setFetching(true);
      setError("");

      const response = await fetch("http://localhost:5000/feedback");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch feedback");
      }

      setFeedbacks(data.feedbacks || []);
    } catch (error) {
      console.error("Fetch feedback error:", error);
      setError(error.message || "Unable to load feedback.");
    } finally {
      setFetching(false);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================================
  // SUBMIT FEEDBACK
  // =====================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit feedback");
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

      await fetchFeedbacks();
    } catch (error) {
      console.error("Submit feedback error:", error);
      setError(error.message || "Unable to submit feedback.");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // DELETE FEEDBACK
  // =====================================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this feedback?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setMessage("");
      setError("");

      const response = await fetch(`http://localhost:5000/feedback/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete feedback");
      }

      setMessage("Feedback deleted successfully.");
      await fetchFeedbacks();
    } catch (error) {
      console.error("Delete feedback error:", error);
      setError(error.message || "Unable to delete feedback.");
    }
  };

  // =====================================================
  // SENTIMENT STYLE
  // =====================================================

  const getSentimentStyle = (sentiment) => {
    if (sentiment === "positive") {
      return "bg-green-500/10 text-green-400 border-green-500/20";
    }

    if (sentiment === "negative") {
      return "bg-red-500/10 text-red-400 border-red-500/20";
    }

    if (sentiment === "neutral") {
      return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
    }

    return "bg-purple-500/10 text-purple-400 border-purple-500/20";
  };

  // =====================================================
  // FILTER + SEARCH + SORT
  // =====================================================

  const filteredFeedbacks = useMemo(() => {
    let results = [...feedbacks];

    // ---------------------------------------------
    // SEARCH
    // ---------------------------------------------

    const search = searchTerm.trim().toLowerCase();

    if (search) {
      results = results.filter((feedback) => {
        const customerName = feedback.customerName?.toLowerCase() || "";
        const customerEmail = feedback.customerEmail?.toLowerCase() || "";
        const feedbackMessage = feedback.message?.toLowerCase() || "";

        return (
          customerName.includes(search) ||
          customerEmail.includes(search) ||
          feedbackMessage.includes(search)
        );
      });
    }

    // ---------------------------------------------
    // SENTIMENT FILTER
    // ---------------------------------------------

    if (sentimentFilter !== "all") {
      results = results.filter(
        (feedback) => feedback.sentiment?.toLowerCase() === sentimentFilter
      );
    }

    // ---------------------------------------------
    // SOURCE FILTER
    // ---------------------------------------------

    if (sourceFilter !== "all") {
      results = results.filter(
        (feedback) => feedback.source?.toLowerCase() === sourceFilter
      );
    }

    // ---------------------------------------------
    // SORT
    // ---------------------------------------------

    return results.sort((a, b) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();

      if (sortOrder === "newest") {
        return dateB - dateA;
      }

      return dateA - dateB;
    });
  }, [
    feedbacks,
    searchTerm,
    sentimentFilter,
    sourceFilter,
    sortOrder,
  ]);

  // =====================================================
  // CLEAR FILTERS
  // =====================================================

  const clearFilters = () => {
    setSearchTerm("");
    setSentimentFilter("all");
    setSourceFilter("all");
    setSortOrder("newest");
  };

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <div className="min-h-screen bg-gray-950 px-5 py-10 text-white sm:px-8 md:px-10 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
            Project LOOP
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Customer Feedback
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-gray-400">
            Collect customer feedback and automatically analyze it using
            AI-powered insights.
          </p>
        </div>

        {/* =================================================
            SUCCESS MESSAGE
        ================================================= */}

        {message && (
          <div className="mb-6 rounded-2xl border border-green-500/20 bg-green-500/10 px-5 py-4 text-sm leading-6 text-green-400">
            {message}
          </div>
        )}

        {/* =================================================
            ERROR MESSAGE
        ================================================= */}

        {error && (
          <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm leading-6 text-red-400">
            {error}
          </div>
        )}

        {/* =================================================
            SUBMIT FEEDBACK
        ================================================= */}

        <div className="mb-12 rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-xl sm:p-8 lg:p-9">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold">Submit Feedback</h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
              Your feedback will automatically be analyzed by Project LOOP AI.
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
                  className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3.5 text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
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
                  className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3.5 text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
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
                  className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3.5 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="website">Website</option>
                  <option value="manual">Manual</option>
                  <option value="survey">Survey</option>
                  <option value="email">Email</option>
                  <option value="review">Review</option>
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
                className="w-full resize-none rounded-xl border border-gray-700 bg-gray-950 px-4 py-3.5 leading-7 text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Submit */}

            <div className="mt-7 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 px-7 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {loading ? "Analyzing..." : "Submit Feedback"}
              </button>
            </div>
          </form>
        </div>

        {/* =================================================
            FEEDBACK MANAGEMENT
        ================================================= */}

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Feedback Management</h2>

            <p className="mt-2 text-sm leading-6 text-gray-400">
              Search, filter and manage your AI-analyzed customer feedback.
            </p>
          </div>

          <div className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-300">
              {filteredFeedbacks.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-300">
              {feedbacks.length}
            </span>{" "}
            feedback
          </div>
        </div>

        {/* =================================================
            SEARCH + FILTERS
        ================================================= */}

        <div className="mb-8 rounded-2xl border border-gray-800 bg-gray-900 p-5 shadow-lg sm:p-6">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            {/* Search */}

            <div className="lg:col-span-5">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                Search
              </label>

              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  🔎
                </span>

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search name, email or feedback..."
                  className="w-full rounded-xl border border-gray-700 bg-gray-950 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            {/* Sentiment */}

            <div className="lg:col-span-2">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                Sentiment
              </label>

              <select
                value={sentimentFilter}
                onChange={(event) => setSentimentFilter(event.target.value)}
                className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3.5 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="all">All Sentiments</option>
                <option value="positive">Positive</option>
                <option value="negative">Negative</option>
                <option value="neutral">Neutral</option>
              </select>
            </div>

            {/* Source */}

            <div className="lg:col-span-2">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                Source
              </label>

              <select
                value={sourceFilter}
                onChange={(event) => setSourceFilter(event.target.value)}
                className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3.5 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="all">All Sources</option>
                <option value="website">Website</option>
                <option value="manual">Manual</option>
                <option value="survey">Survey</option>
                <option value="email">Email</option>
                <option value="review">Review</option>
              </select>
            </div>

            {/* Sort */}

            <div className="lg:col-span-2">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                Sort
              </label>

              <select
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value)}
                className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3.5 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>

            {/* Clear */}

            <div className="lg:col-span-1 lg:flex lg:items-end">
              <button
                type="button"
                onClick={clearFilters}
                className="w-full rounded-xl border border-gray-700 px-4 py-3.5 text-sm font-medium text-gray-300 transition hover:border-gray-600 hover:bg-gray-800 hover:text-white lg:h-[50px]"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* =================================================
            RECENT FEEDBACK
        ================================================= */}

        <div>
          {fetching ? (
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-12 text-center text-gray-400">
              Loading feedback...
            </div>
          ) : filteredFeedbacks.length === 0 ? (
            <div className="rounded-2xl border border-gray-800 bg-gray-900 px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-800 text-2xl">
                🔎
              </div>

              <h3 className="mt-5 text-lg font-semibold text-white">
                No feedback found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                Try changing your search term or filters to find the feedback
                you're looking for.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 rounded-xl border border-gray-700 px-5 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-gray-800 hover:text-white"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredFeedbacks.map((feedback) => (
                <div
                  key={feedback._id}
                  className="rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-lg transition hover:border-gray-700 sm:p-7"
                >
                  {/* =================================================
                      TOP ROW
                  ================================================= */}

                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-semibold text-white">
                          {feedback.customerName || "Unknown Customer"}
                        </h3>

                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize ${getSentimentStyle(
                            feedback.sentiment
                          )}`}
                        >
                          {feedback.sentiment || "unknown"}
                        </span>

                        {feedback.source && (
                          <span className="rounded-full border border-gray-700 bg-gray-800 px-3 py-1 text-xs font-medium capitalize text-gray-400">
                            {feedback.source}
                          </span>
                        )}
                      </div>

                      {feedback.customerEmail && (
                        <p className="mt-2 text-sm text-gray-500">
                          {feedback.customerEmail}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      {feedback.createdAt && (
                        <span className="hidden text-xs text-gray-600 sm:block">
                          {new Date(feedback.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() => handleDelete(feedback._id)}
                        className="rounded-lg border border-red-500/20 px-3.5 py-2 text-xs font-medium text-red-400 transition hover:bg-red-500/10"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* =================================================
                      ORIGINAL FEEDBACK
                  ================================================= */}

                  <div className="mt-6 rounded-xl border border-gray-800 bg-gray-950 p-5">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Customer Feedback
                    </p>

                    <p className="leading-7 text-gray-300">
                      {feedback.message}
                    </p>
                  </div>

                  {/* =================================================
                      AI ANALYSIS
                  ================================================= */}

                  <div className="mt-7">
                    <div className="mb-5 flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-xs font-bold text-blue-400">
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

                    {feedback.themes && feedback.themes.length > 0 && (
                      <div className="mb-5">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Main Themes
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {feedback.themes.map((theme, index) => (
                            <span
                              key={`${theme}-${index}`}
                              className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-xs text-blue-400"
                            >
                              {theme}
                            </span>
                          ))}
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

        {/* Bottom spacing */}

        <div className="h-12" />
      </div>
    </div>
  );
}

export default FeedbackPage;