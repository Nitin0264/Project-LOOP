import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditFeedbackPage() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [feedback, setFeedback] = useState({
    customerName: "",
    customerEmail: "",
    source: "",
    message: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");


  // Get existing feedback
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

        const selectedFeedback = data.feedbacks.find(
          (item) => item._id === id
        );

        if (!selectedFeedback) {
          setError("Feedback not found.");
          return;
        }

        setFeedback({
          customerName: selectedFeedback.customerName,
          customerEmail: selectedFeedback.customerEmail,
          source: selectedFeedback.source,
          message: selectedFeedback.message,
        });

      } catch (error) {

        console.error(error);

        setError(
          "Unable to load feedback."
        );

      } finally {

        setLoading(false);

      }

    };

    fetchFeedback();

  }, [id]);


  // Handle input changes
  const handleChange = (e) => {

    const { name, value } = e.target;

    setFeedback((previous) => ({
      ...previous,
      [name]: value,
    }));

  };


  // Update feedback
  const handleSubmit = async (e) => {

    e.preventDefault();

    setSaving(true);
    setError("");

    try {

      const response = await fetch(
        `http://localhost:5000/feedback/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(feedback),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update feedback"
        );
      }

      navigate("/feedback");

    } catch (error) {

      console.error(error);

      setError(
        error.message || "Unable to update feedback."
      );

    } finally {

      setSaving(false);

    }

  };


  if (loading) {

    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">

        <p className="text-gray-400">
          Loading feedback...
        </p>

      </div>
    );

  }


  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10 md:px-10 lg:px-12">

      <div className="max-w-4xl mx-auto">

        {/* Header */}

        <div className="mb-10">

          <p className="text-sm font-semibold tracking-wider text-blue-400 uppercase">
            Customer Intelligence
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-3">
            Edit Feedback
          </h1>

          <p className="text-gray-400 mt-4">
            Update the customer's feedback information.
          </p>

        </div>


        {/* Error */}

        {error && (

          <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400">
            {error}
          </div>

        )}


        {/* Form */}

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8 lg:p-10">

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-7"
          >

            {/* Customer Name */}

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
                required
                className="w-full px-4 py-3.5 bg-gray-950 border border-gray-700 rounded-lg text-white outline-none focus:border-blue-500 transition"
              />

            </div>


            {/* Customer Email */}

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
                required
                className="w-full px-4 py-3.5 bg-gray-950 border border-gray-700 rounded-lg text-white outline-none focus:border-blue-500 transition"
              />

            </div>


            {/* Source */}

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
                className="w-full px-4 py-3.5 bg-gray-950 border border-gray-700 rounded-lg text-gray-300 outline-none focus:border-blue-500 transition"
              >

                <option value="">
                  Select source
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


            {/* Message */}

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
                rows="8"
                required
                className="w-full px-4 py-3.5 bg-gray-950 border border-gray-700 rounded-lg text-white outline-none focus:border-blue-500 transition resize-none"
              />

            </div>


            {/* Buttons */}

            <div className="flex flex-col sm:flex-row gap-4 pt-4">

              <button
                type="submit"
                disabled={saving}
                className="px-7 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 disabled:cursor-not-allowed transition font-semibold"
              >
                {saving
                  ? "Saving Changes..."
                  : "Save Changes"}
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

export default EditFeedbackPage;