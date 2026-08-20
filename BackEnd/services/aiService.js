import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI, Type } from "@google/genai";

// =====================================================
// CHECK GEMINI API KEY
// =====================================================

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error(
    "GEMINI_API_KEY is missing. Check your BackEnd/.env file."
  );
}

console.log("Gemini API key loaded successfully.");


// =====================================================
// GEMINI CLIENT
// =====================================================

const ai = new GoogleGenAI({
  apiKey,
});


// =====================================================
// AI RESPONSE SCHEMA
// =====================================================

const feedbackAnalysisSchema = {
  type: Type.OBJECT,

  properties: {
    sentiment: {
      type: Type.STRING,
      enum: ["positive", "negative", "neutral"],
    },

    themes: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
    },

    summary: {
      type: Type.STRING,
    },

    keyIssue: {
      type: Type.STRING,
    },

    recommendation: {
      type: Type.STRING,
    },
  },

  required: [
    "sentiment",
    "themes",
    "summary",
    "keyIssue",
    "recommendation",
  ],
};


// =====================================================
// ANALYZE FEEDBACK WITH AI
// =====================================================

const analyzeFeedbackWithAI = async (message) => {
  try {

    // =================================================
    // VALIDATE FEEDBACK
    // =================================================

    if (!message || typeof message !== "string") {
      throw new Error(
        "Feedback message is required."
      );
    }

    const cleanMessage = message.trim();

    if (!cleanMessage) {
      throw new Error(
        "Feedback message cannot be empty."
      );
    }

    console.log(
      "Sending feedback to Gemini..."
    );

    console.log(
      "Feedback:",
      cleanMessage
    );


    // =================================================
    // PROMPT
    // =================================================

    const prompt = `
You are an AI customer feedback analyst for Project LOOP.

Analyze the following customer feedback:

"${cleanMessage}"

Identify:

1. Customer sentiment
2. Important themes
3. A short summary
4. The main issue or important positive point
5. A practical recommendation

Rules:

1. sentiment must be exactly one of:
   - positive
   - negative
   - neutral

2. themes must always be an array of strings.

3. summary must be short and clear.

4. keyIssue must identify the main complaint,
   issue, or important positive point.

5. recommendation must provide a practical
   action that a business could take.

6. If the feedback is random, meaningless,
   unclear, or too short to analyze:

   - sentiment = neutral
   - themes should indicate unclear or invalid feedback
   - summary should explain that the feedback is unclear
   - keyIssue should indicate insufficient information
   - recommendation should request clearer feedback.

7. Do not invent information that is not present
   in the customer's feedback.

Return only the requested structured JSON response.
`;


    // =================================================
    // GEMINI REQUEST WITH RETRY
    // =================================================

    const MAX_RETRIES = 3;

    let response = null;


    for (
      let attempt = 1;
      attempt <= MAX_RETRIES;
      attempt++
    ) {

      try {

        console.log(
          `Gemini request attempt ${attempt}/${MAX_RETRIES}...`
        );


        response = await ai.models.generateContent({

          // -------------------------------------------
          // STABLE FLASH MODEL
          // -------------------------------------------

          model: "gemini-2.5-flash",

          contents: prompt,

          config: {
            responseMimeType: "application/json",
            responseSchema: feedbackAnalysisSchema,
          },

        });


        console.log(
          "Gemini response received."
        );


        // -------------------------------------------
        // SUCCESS
        // -------------------------------------------

        break;


      } catch (error) {

        const errorMessage =
          error?.message || "";


        console.error(
          `Gemini attempt ${attempt} failed:`
        );

        console.error(
          errorMessage
        );


        // -------------------------------------------
        // CHECK TEMPORARY ERROR
        // -------------------------------------------

        const isTemporaryError =
          errorMessage.includes("503") ||
          errorMessage.includes("UNAVAILABLE") ||
          errorMessage.includes("overloaded") ||
          errorMessage.includes("429") ||
          errorMessage.includes("RESOURCE_EXHAUSTED");


        // -------------------------------------------
        // NON-RETRYABLE ERROR
        // -------------------------------------------

        if (!isTemporaryError) {

          throw error;

        }


        // -------------------------------------------
        // LAST ATTEMPT FAILED
        // -------------------------------------------

        if (attempt === MAX_RETRIES) {

          throw new Error(
            "Gemini AI is temporarily unavailable. Please try again in a moment."
          );

        }


        // -------------------------------------------
        // EXPONENTIAL BACKOFF
        // -------------------------------------------

        const delay =
          1000 * Math.pow(2, attempt - 1);


        console.log(
          `Retrying Gemini in ${delay}ms...`
        );


        await new Promise(
          (resolve) =>
            setTimeout(resolve, delay)
        );

      }

    }


    // =================================================
    // MAKE SURE RESPONSE EXISTS
    // =================================================

    if (!response) {

      throw new Error(
        "Gemini did not return a response."
      );

    }


    // =================================================
    // GET RESPONSE TEXT
    // =================================================

    const responseText =
      response.text;


    if (!responseText) {

      throw new Error(
        "Gemini returned an empty response."
      );

    }


    // =================================================
    // PARSE JSON
    // =================================================

    let analysis;

    try {

      analysis =
        JSON.parse(responseText);

    } catch (parseError) {

      console.error(
        "Gemini returned invalid JSON:"
      );

      console.error(
        responseText
      );

      throw new Error(
        "Gemini returned invalid JSON."
      );

    }


    // =================================================
    // VALIDATE SENTIMENT
    // =================================================

    const allowedSentiments = [
      "positive",
      "negative",
      "neutral",
    ];


    const sentiment =
      allowedSentiments.includes(
        analysis.sentiment
      )
        ? analysis.sentiment
        : "neutral";


    // =================================================
    // CLEAN THEMES
    // =================================================

    const themes =
      Array.isArray(
        analysis.themes
      )
        ? analysis.themes
            .filter(
              (theme) =>
                typeof theme === "string"
            )
            .map(
              (theme) =>
                theme.trim()
            )
            .filter(Boolean)
        : [];


    // =================================================
    // CLEAN RESULT
    // =================================================

    const result = {

      sentiment,

      themes,

      summary:
        typeof analysis.summary === "string"
          ? analysis.summary.trim()
          : "",

      keyIssue:
        typeof analysis.keyIssue === "string"
          ? analysis.keyIssue.trim()
          : "",

      recommendation:
        typeof analysis.recommendation === "string"
          ? analysis.recommendation.trim()
          : "",

    };


    // =================================================
    // LOG RESULT
    // =================================================

    console.log(
      "AI analysis completed successfully."
    );

    console.log(
      "AI Analysis:",
      result
    );


    // =================================================
    // RETURN RESULT
    // =================================================

    return result;


  } catch (error) {

    console.error(
      "========== GEMINI ERROR =========="
    );

    console.error(
      "Message:",
      error.message
    );

    console.error(
      "Full Error:",
      error
    );

    console.error(
      "=================================="
    );

    throw error;

  }

};


// =====================================================
// EXPORT
// =====================================================

export {
  analyzeFeedbackWithAI,
};