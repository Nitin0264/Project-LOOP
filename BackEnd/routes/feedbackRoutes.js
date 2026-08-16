import express from "express";
import {Feedback} from "../model/feedback.js"

import {
  analyzeFeedbackWithAI,
} from "../services/aiService.js";

const feedbackRoutes = express.Router();


// =====================================================
// CREATE FEEDBACK + AI ANALYSIS
// =====================================================

feedbackRoutes.post("/", async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      message,
      source,
    } = req.body;


    // ---------------------------------------------
    // Validate required fields
    // ---------------------------------------------

    if (!customerName || !message) {
      return res.status(400).json({
        message:
          "Customer name and feedback message are required",
      });
    }


    // ---------------------------------------------
    // Send feedback to Gemini
    // ---------------------------------------------

    console.log(
      "Analyzing feedback with Gemini..."
    );

    const aiAnalysis =
      await analyzeFeedbackWithAI(message);


    // ---------------------------------------------
    // Create feedback document
    // ---------------------------------------------

    const feedback = new Feedback({

      customerName,

      customerEmail,

      message,

      source: source || "manual",

      sentiment:
        aiAnalysis.sentiment,

      themes:
        aiAnalysis.themes,

      summary:
        aiAnalysis.summary,

      keyIssue:
        aiAnalysis.keyIssue,

      recommendation:
        aiAnalysis.recommendation,
    });


    // ---------------------------------------------
    // Save to MongoDB
    // ---------------------------------------------

    const savedFeedback =
      await feedback.save();


    // ---------------------------------------------
    // Send response
    // ---------------------------------------------

    res.status(201).json({

      message:
        "Feedback submitted and analyzed successfully",

      feedback:
        savedFeedback,

    });

  } catch (error) {

    console.error(
      "Feedback creation error:",
      error
    );

    res.status(500).json({

      message:
        "Failed to create feedback",

      error:
        error.message,

    });
  }
});


// =====================================================
// GET ALL FEEDBACK
// =====================================================

feedbackRoutes.get("/", async (req, res) => {
  try {

    const feedbacks =
      await Feedback.find()
        .sort({
          createdAt: -1,
        });


    res.status(200).json({
      feedbacks,
    });

  } catch (error) {

    console.error(
      "Get feedback error:",
      error
    );

    res.status(500).json({
      message:
        "Failed to fetch feedback",
    });
  }
});


// =====================================================
// GET SINGLE FEEDBACK
// =====================================================

// feedbackRoutes.get("/:id", async (req, res) => {
//   try {

//     const feedback =
//       await Feedback.findById(
//         req.params.id
//       );


//     if (!feedback) {
//       return res.status(404).json({
//         message:
//           "Feedback not found",
//       });
//     }


//     res.status(200).json({
//       feedback,
//     });

//   } catch (error) {

//     console.error(
//       "Get single feedback error:",
//       error
//     );

//     res.status(500).json({
//       message:
//         "Failed to fetch feedback",
//     });
//   }
// });


// =====================================================
// UPDATE FEEDBACK
// =====================================================

feedbackRoutes.put("/:id", async (req, res) => {
  try {

    const {
      customerName,
      customerEmail,
      message,
      source,
    } = req.body;


    const feedback =
      await Feedback.findById(
        req.params.id
      );


    if (!feedback) {
      return res.status(404).json({
        message:
          "Feedback not found",
      });
    }


    // ---------------------------------------------
    // If message changes, analyze it again
    // ---------------------------------------------

    if (
      message &&
      message !== feedback.message
    ) {

      console.log(
        "Re-analyzing updated feedback..."
      );


      const aiAnalysis =
        await analyzeFeedbackWithAI(
          message
        );


      feedback.sentiment =
        aiAnalysis.sentiment;

      feedback.themes =
        aiAnalysis.themes;

      feedback.summary =
        aiAnalysis.summary;

      feedback.keyIssue =
        aiAnalysis.keyIssue;

      feedback.recommendation =
        aiAnalysis.recommendation;

      feedback.message =
        message;
    }


    // ---------------------------------------------
    // Update normal fields
    // ---------------------------------------------

    if (customerName) {
      feedback.customerName =
        customerName;
    }

    if (customerEmail) {
      feedback.customerEmail =
        customerEmail;
    }

    if (source) {
      feedback.source =
        source;
    }


    const updatedFeedback =
      await feedback.save();


    res.status(200).json({

      message:
        "Feedback updated successfully",

      feedback:
        updatedFeedback,

    });

  } catch (error) {

    console.error(
      "Update feedback error:",
      error
    );

    res.status(500).json({
      message:
        "Failed to update feedback",
      error:
        error.message,
    });
  }
});


// =====================================================
// DELETE FEEDBACK
// =====================================================

feedbackRoutes.delete("/:id", async (req, res) => {
  try {

    const deletedFeedback =
      await Feedback.findByIdAndDelete(
        req.params.id
      );


    if (!deletedFeedback) {
      return res.status(404).json({
        message:
          "Feedback not found",
      });
    }


    res.status(200).json({

      message:
        "Feedback deleted successfully",

    });

  } catch (error) {

    console.error(
      "Delete feedback error:",
      error
    );

    res.status(500).json({
      message:
        "Failed to delete feedback",
    });
  }
});


export {feedbackRoutes};