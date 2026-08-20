import express from "express";

import { Feedback } from "../model/feedback.js";

import {
  analyzeFeedbackWithAI,
} from "../services/aiService.js";

import {
  authMiddleware,
} from "../middleware/authMiddleware.js";


const feedbackRoutes = express.Router();


// =====================================================
// CREATE FEEDBACK + AI ANALYSIS
// =====================================================

feedbackRoutes.post(
  "/",
  authMiddleware,
  async (req, res) => {

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
          success: false,
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

        source:
          source || "manual",

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

      return res.status(201).json({

        success: true,

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


      return res.status(500).json({

        success: false,

        message:
          "Failed to create feedback",

        error:
          error.message,

      });

    }

  }
);


// =====================================================
// GET ALL FEEDBACK
// =====================================================

feedbackRoutes.get(
  "/",
  authMiddleware,
  async (req, res) => {

    try {

      const feedbacks =
        await Feedback.find()
          .sort({
            createdAt: -1,
          });


      return res.status(200).json({

        success: true,

        feedbacks,

      });

    } catch (error) {

      console.error(
        "Get feedback error:",
        error
      );


      return res.status(500).json({

        success: false,

        message:
          "Failed to fetch feedback",

        error:
          error.message,

      });

    }

  }
);


// =====================================================
// GET FEEDBACK ANALYTICS
// =====================================================

feedbackRoutes.get(
  "/analytics",
  authMiddleware,
  async (req, res) => {

    try {

      // ---------------------------------------------
      // Get total feedback
      // ---------------------------------------------

      const totalFeedback =
        await Feedback.countDocuments();


      // ---------------------------------------------
      // Sentiment counts
      // ---------------------------------------------

      const positive =
        await Feedback.countDocuments({
          sentiment: "positive",
        });


      const negative =
        await Feedback.countDocuments({
          sentiment: "negative",
        });


      const neutral =
        await Feedback.countDocuments({
          sentiment: "neutral",
        });


      // ---------------------------------------------
      // Get all feedback for theme analysis
      // ---------------------------------------------

      const feedbacks =
        await Feedback.find();


      // ---------------------------------------------
      // Count themes
      // ---------------------------------------------

      const themeMap = {};


      feedbacks.forEach(
        (feedback) => {

          if (
            Array.isArray(
              feedback.themes
            )
          ) {

            feedback.themes.forEach(
              (theme) => {

                if (!theme) {
                  return;
                }


                const normalizedTheme =
                  theme.trim();


                if (!normalizedTheme) {
                  return;
                }


                themeMap[
                  normalizedTheme
                ] =
                  (themeMap[
                    normalizedTheme
                  ] || 0) + 1;

              }
            );

          }

        }
      );


      // ---------------------------------------------
      // Convert themes to array
      // ---------------------------------------------

      const themes =
        Object.entries(themeMap)
          .map(
            ([theme, count]) => ({
              theme,
              count,
            })
          )
          .sort(
            (a, b) =>
              b.count - a.count
          );


      // ---------------------------------------------
      // Recent feedback
      // ---------------------------------------------

      const recentFeedback =
        await Feedback.find()
          .sort({
            createdAt: -1,
          })
          .limit(5);


      // ---------------------------------------------
      // Send analytics
      // ---------------------------------------------

      return res.status(200).json({

        success: true,

        totalFeedback,

        sentiment: {

          positive,

          negative,

          neutral,

        },

        themes,

        recentFeedback,

      });

    } catch (error) {

      console.error(
        "Analytics error:",
        error
      );


      return res.status(500).json({

        success: false,

        message:
          "Failed to fetch analytics",

        error:
          error.message,

      });

    }

  }
);


// =====================================================
// GET SINGLE FEEDBACK
// =====================================================

feedbackRoutes.get(
  "/:id",
  authMiddleware,
  async (req, res) => {

    try {

      const feedback =
        await Feedback.findById(
          req.params.id
        );


      if (!feedback) {

        return res.status(404).json({

          success: false,

          message:
            "Feedback not found",

        });

      }


      return res.status(200).json({

        success: true,

        feedback,

      });

    } catch (error) {

      console.error(
        "Get single feedback error:",
        error
      );


      return res.status(500).json({

        success: false,

        message:
          "Failed to fetch feedback",

        error:
          error.message,

      });

    }

  }
);


// =====================================================
// UPDATE FEEDBACK
// =====================================================

feedbackRoutes.put(
  "/:id",
  authMiddleware,
  async (req, res) => {

    try {

      const {
        customerName,
        customerEmail,
        message,
        source,
      } = req.body;


      // ---------------------------------------------
      // Find feedback
      // ---------------------------------------------

      const feedback =
        await Feedback.findById(
          req.params.id
        );


      if (!feedback) {

        return res.status(404).json({

          success: false,

          message:
            "Feedback not found",

        });

      }


      // ---------------------------------------------
      // Re-analyze if message changes
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


      // ---------------------------------------------
      // Save updated feedback
      // ---------------------------------------------

      const updatedFeedback =
        await feedback.save();


      return res.status(200).json({

        success: true,

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


      return res.status(500).json({

        success: false,

        message:
          "Failed to update feedback",

        error:
          error.message,

      });

    }

  }
);


// =====================================================
// DELETE FEEDBACK
// =====================================================

feedbackRoutes.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {

    try {

      const deletedFeedback =
        await Feedback.findByIdAndDelete(
          req.params.id
        );


      if (!deletedFeedback) {

        return res.status(404).json({

          success: false,

          message:
            "Feedback not found",

        });

      }


      return res.status(200).json({

        success: true,

        message:
          "Feedback deleted successfully",

      });

    } catch (error) {

      console.error(
        "Delete feedback error:",
        error
      );


      return res.status(500).json({

        success: false,

        message:
          "Failed to delete feedback",

        error:
          error.message,

      });

    }

  }
);


// =====================================================
// EXPORT
// =====================================================

export {
  feedbackRoutes,
};
