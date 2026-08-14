const express = require("express");
const Feedback = require("../models/feedback");


const router = express.Router();


// POST - Create new feedback
router.post("/", async (req, res) => {
  try {

    const {
      customerName,
      customerEmail,
      source,
      message,
    } = req.body;


    // Check required fields
    if (
      !customerName ||
      !customerEmail ||
      !source ||
      !message
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }


    // Create feedback
    const newFeedback = new Feedback({
      customerName,
      customerEmail,
      source,
      message,
    });


    // Save to MongoDB
    const savedFeedback = await newFeedback.save();


    res.status(201).json({
      message: "Feedback created successfully",
      feedback: savedFeedback,
    });

  } catch (error) {

    console.error("Feedback creation error:", error);

    res.status(500).json({
      message: "Server error while creating feedback",
    });

  }
});
// GET - Get all feedback
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });

    res.status(200).json({
      feedbacks,
    });

  } catch (error) {

    console.error("Error fetching feedback:", error);

    res.status(500).json({
      message: "Server error while fetching feedback",
    });

  }
});
// DELETE - Delete feedback
router.delete("/:id", async (req, res) => {
  try {

    const deletedFeedback = await Feedback.findByIdAndDelete(
      req.params.id
    );

    if (!deletedFeedback) {
      return res.status(404).json({
        message: "Feedback not found",
      });
    }

    res.status(200).json({
      message: "Feedback deleted successfully",
    });

  } catch (error) {

    console.error("Feedback deletion error:", error);

    res.status(500).json({
      message: "Server error while deleting feedback",
    });

  }
});

module.exports = router;