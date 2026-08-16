const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    customerEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    source: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

sentiment: {
  type: String,
  enum: [
    "positive",
    "neutral",
    "negative",
  ],
},

themes: {
  type: [String],
  default: [],
},

summary: {
  type: String,
  default: "",
},

keyIssue: {
  type: String,
  default: "",
},

recommendation: {
  type: String,
  default: "",
},
  },
  {
    timestamps: true,
  }
);

const Feedback_Model = mongoose.model("Feedback",
  feedbackSchema)

export {Feedback_Model}