import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AskAI() {
  // =====================================================
  // STATE
  // =====================================================

  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =====================================================
  // SUGGESTED QUESTIONS
  // =====================================================

  const suggestedQuestions = [
    "What are the biggest complaints from customers?",
    "What are customers most happy about?",
    "What should we improve based on customer feedback?",
    "What is the overall customer sentiment?",
    "Summarize the most important customer feedback.",
  ];

  // =====================================================
  // ASK AI
  // =====================================================

  const handleAskAI = async (event) => {
    event.preventDefault();

    setError("");
    setAnswer("");

    const cleanQuestion = question.trim();

    if (!cleanQuestion) {
      setError("Please enter a question.");
      return;
    }

    try {
      setLoading(true);

      const data = await api("/feedback/ask-ai", {
        method: "POST",

        body: JSON.stringify({
          question: cleanQuestion,
        }),
      });

      console.log("Ask AI response:", data);

      // -------------------------------------------------
      // AUTHENTICATION ERROR
      // -------------------------------------------------

      if (data.status === 401) {
        setError(
          "Your session has expired. Please login again."
        );

        return;
      }

      // -------------------------------------------------
      // API ERROR
      // -------------------------------------------------

      if (!data.ok || data.success === false) {
        throw new Error(
          data.message ||
            "Unable to get an answer from AI."
        );
      }

      // -------------------------------------------------
      // SUCCESS
      // -------------------------------------------------

      setAnswer(
        data.answer ||
          data.response ||
          "AI did not return an answer."
      );

    } catch (error) {
      console.error(
        "Ask AI error:",
        error
      );

      setError(
        error.message ||
          "Unable to get an answer from AI."
      );

    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // USE SUGGESTED QUESTION
  // =====================================================

  const handleSuggestedQuestion = (suggestion) => {
    setQuestion(suggestion);
    setAnswer("");
    setError("");
  };

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <div className="min-h-screen bg-gray-950 px-5 py-10 text-white sm:px-8 md:px-10 lg:px-12">

      <div className="mx-auto max-w-5xl">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-10">

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
            Project LOOP
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Ask AI
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-gray-400">
            Ask questions about your customer feedback and get
            AI-powered business insights based on your actual
            feedback data.
          </p>

        </div>


        {/* =================================================
            QUESTION FORM
        ================================================= */}

        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-xl sm:p-8">

          <div className="mb-6">

            <h2 className="text-xl font-semibold">
              Ask a question
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Project LOOP AI will analyze your stored customer
              feedback to answer your question.
            </p>

          </div>


          <form onSubmit={handleAskAI}>

            <textarea
              value={question}
              onChange={(event) =>
                setQuestion(event.target.value)
              }
              rows="5"
              placeholder="Example: What are the biggest complaints from customers?"
              className="w-full resize-none rounded-xl border border-gray-700 bg-gray-950 px-5 py-4 leading-7 text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />


            <div className="mt-5 flex justify-end">

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 px-7 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {loading
                  ? "Analyzing Feedback..."
                  : "Ask AI"}
              </button>

            </div>

          </form>

        </div>


        {/* =================================================
            SUGGESTED QUESTIONS
        ================================================= */}

        <div className="mt-8 rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-lg sm:p-7">

          <div className="mb-5">

            <h2 className="text-lg font-semibold">
              Try asking
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Select a question to get started.
            </p>

          </div>


          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">

            {suggestedQuestions.map(
              (suggestion, index) => (

                <button
                  key={index}
                  type="button"
                  onClick={() =>
                    handleSuggestedQuestion(
                      suggestion
                    )
                  }
                  className="rounded-xl border border-gray-800 bg-gray-950 px-4 py-3 text-left text-sm leading-6 text-gray-400 transition hover:border-blue-500/40 hover:bg-blue-500/5 hover:text-blue-300"
                >
                  {suggestion}
                </button>

              )
            )}

          </div>

        </div>


        {/* =================================================
            ERROR
        ================================================= */}

        {error && (

          <div className="mt-8 flex flex-col gap-4 rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-400 sm:flex-row sm:items-center sm:justify-between">

            <span>
              {error}
            </span>

            {error.includes("session") && (

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="w-fit rounded-lg bg-red-500/10 px-4 py-2 font-semibold text-red-300 transition hover:bg-red-500/20"
              >
                Login Again
              </button>

            )}

          </div>

        )}


        {/* =================================================
            AI ANSWER
        ================================================= */}

        {answer && (

          <div className="mt-8 rounded-2xl border border-blue-500/20 bg-gray-900 p-6 shadow-xl sm:p-8">

            <div className="mb-6 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 font-bold text-blue-400">
                AI
              </div>

              <div>

                <h2 className="text-xl font-semibold">
                  AI Insight
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Based on your customer feedback
                </p>

              </div>

            </div>


            <div className="rounded-xl border border-gray-800 bg-gray-950 p-5">

              <p className="whitespace-pre-wrap text-sm leading-7 text-gray-300 sm:text-base">
                {answer}
              </p>

            </div>

          </div>

        )}


        <div className="h-16" />

      </div>

    </div>
  );
}

export default AskAI;

