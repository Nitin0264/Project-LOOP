import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddFeedbackPage() {

  const navigate = useNavigate();

  const [feedback, setFeedback] = useState({
    customerName: "",
    customerEmail: "",
    source: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  // =====================================================
  // HANDLE INPUT CHANGES
  // =====================================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFeedback((previous) => ({
      ...previous,
      [name]: value,
    }));

  };


  // =====================================================
  // HANDLE FORM SUBMISSION
  // =====================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {

      // =================================================
      // GET JWT TOKEN
      // =================================================

      const token = localStorage.getItem("token");

      console.log("Token found:", !!token);


      // =================================================
      // CHECK LOGIN
      // =================================================

      if (!token) {

        setError(
          "You are not logged in. Please login first."
        );

        return;
      }


      // =================================================
      // SEND FEEDBACK TO BACKEND
      // =================================================

      const response = await fetch(
        "http://localhost:5000/feedback",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",

            // IMPORTANT:
            // Send JWT token to protected backend route
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(feedback),
        }
      );


      // =================================================
      // READ RESPONSE
      // =================================================

      const data = await response.json();


      console.log(
        "Feedback API response:",
        data
      );


      // =================================================
      // HANDLE API ERROR
      // =================================================

      if (!response.ok) {

        setError(
          data.message ||
          data.error ||
          "Unable to save feedback."
        );

        return;
      }


      // =================================================
      // SUCCESS
      // =================================================

      setSuccess(
        "Feedback saved successfully!"
      );


      // =================================================
      // CLEAR FORM
      // =================================================

      setFeedback({
        customerName: "",
        customerEmail: "",
        source: "",
        message: "",
      });


      // =================================================
      // GO BACK TO FEEDBACK PAGE
      // =================================================

      setTimeout(() => {

        navigate("/feedback");

      }, 1000);


    } catch (error) {

      console.error(
        "Feedback submission error:",
        error
      );

      setError(
        "Unable to connect to the server. Please try again."
      );

    } finally {

      setLoading(false);

    }

  };


  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="min-h-screen bg-gray-950 text-white px-6 py-10 md:px-10 lg:px-12">

      <div className="max-w-4xl mx-auto">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-10">

          <p className="text-sm font-semibold tracking-wider text-blue-400 uppercase">
            Customer Intelligence
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-3">
            Add Customer Feedback
          </h1>

          <p className="text-gray-400 mt-4 max-w-2xl leading-relaxed">
            Add customer feedback to your Project LOOP workspace.
            Once saved, this feedback can be analyzed for sentiment,
            themes, and customer insights.
          </p>

        </div>


        {/* =================================================
            FORM CARD
        ================================================= */}

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8 lg:p-10">

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-7"
          >

            {/* =================================================
                ERROR MESSAGE
            ================================================= */}

            {error && (

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400">

                {error}

              </div>

            )}


            {/* =================================================
                SUCCESS MESSAGE
            ================================================= */}

            {success && (

              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400">

                {success}

              </div>

            )}


            {/* =================================================
                CUSTOMER NAME
            ================================================= */}

            <div className="flex flex-col gap-2">

              <label
                htmlFor="customerName"
                className="text-sm font-medium text-gray-300"
              >
                Customer Name
              </label>

              <input
                id="customerName"
                name="customerName"
                type="text"
                value={feedback.customerName}
                onChange={handleChange}
                placeholder="Enter customer name"
                required
                className="w-full px-4 py-3.5 bg-gray-950 border border-gray-700 rounded-lg text-white placeholder-gray-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />

            </div>


            {/* =================================================
                CUSTOMER EMAIL
            ================================================= */}

            <div className="flex flex-col gap-2">

              <label
                htmlFor="customerEmail"
                className="text-sm font-medium text-gray-300"
              >
                Customer Email
              </label>

              <input
                id="customerEmail"
                name="customerEmail"
                type="email"
                value={feedback.customerEmail}
                onChange={handleChange}
                placeholder="customer@example.com"
                required
                className="w-full px-4 py-3.5 bg-gray-950 border border-gray-700 rounded-lg text-white placeholder-gray-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />

            </div>


            {/* =================================================
                FEEDBACK SOURCE
            ================================================= */}

            <div className="flex flex-col gap-2">

              <label
                htmlFor="source"
                className="text-sm font-medium text-gray-300"
              >
                Feedback Source
              </label>

              <select
                id="source"
                name="source"
                value={feedback.source}
                onChange={handleChange}
                required
                className="w-full px-4 py-3.5 bg-gray-950 border border-gray-700 rounded-lg text-gray-300 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              >

                <option value="">
                  Select feedback source
                </option>

                <option value="support">
                  Support
                </option>

                <option value="review">
                  Review
                </option>

                <option value="survey">
                  Survey
                </option>

                <option value="sales-call">
                  Sales Call
                </option>

                <option value="community">
                  Community
                </option>

              </select>

            </div>


            {/* =================================================
                FEEDBACK MESSAGE
            ================================================= */}

            <div className="flex flex-col gap-2">

              <label
                htmlFor="message"
                className="text-sm font-medium text-gray-300"
              >
                Customer Feedback
              </label>

              <textarea
                id="message"
                name="message"
                value={feedback.message}
                onChange={handleChange}
                placeholder="Enter the customer's feedback..."
                rows="8"
                required
                className="w-full px-4 py-3.5 bg-gray-950 border border-gray-700 rounded-lg text-white placeholder-gray-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition resize-none"
              />

              <p className="text-xs text-gray-600">
                Enter the customer's feedback as accurately as possible.
              </p>

            </div>


            {/* =================================================
                BUTTONS
            ================================================= */}

            <div className="flex flex-col sm:flex-row gap-4 pt-4">

              <button
                type="submit"
                disabled={loading}
                className="px-7 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 disabled:cursor-not-allowed transition font-semibold"
              >

                {loading
                  ? "Saving Feedback..."
                  : "Save Feedback"}

              </button>


              <button
                type="button"
                onClick={() => navigate("/feedback")}
                className="px-7 py-3.5 rounded-lg border border-gray-700 hover:bg-gray-800 transition font-semibold"
              >

                Cancel

              </button>

            </div>

          </form>

        </div>

      </div>

    </div>

  );

}

export default AddFeedbackPage;