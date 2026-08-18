import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";


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
  apiKey: apiKey,
});


// =====================================================
// ANALYZE FEEDBACK WITH AI
// =====================================================

const analyzeFeedbackWithAI = async (message) => {

  try {

    console.log("Sending feedback to Gemini...");


    const prompt = `
You are an AI customer feedback analyst for Project LOOP.

Analyze the following customer feedback:

"${message}"

Return ONLY valid JSON using exactly this structure:

{
  "sentiment": "positive",
  "themes": ["theme1", "theme2"],
  "summary": "short summary",
  "keyIssue": "main issue",
  "recommendation": "recommended action"
}

Rules:

1. sentiment must be exactly:
   positive
   negative
   neutral

2. themes must always be an array of strings.

3. summary must be short and clear.

4. keyIssue must identify the main issue or important positive point.

5. recommendation must provide a practical action.

6. If the feedback is random, meaningless, or too short:
   - sentiment = neutral
   - identify it as unclear or invalid feedback
   - recommend requesting clearer feedback.

Do not use Markdown.
Do not include anything outside the JSON.
`;


    // =================================================
    // GEMINI REQUEST
    // =================================================

    const response = await ai.models.generateContent({

      model: "gemini-3.6-flash",

      contents: prompt,

      config: {
        temperature: 0.2,

        responseMimeType: "application/json",
      },

    });


    console.log("Gemini response received.");


    // =================================================
    // GET RESPONSE TEXT
    // =================================================

    const responseText = response.text;


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

      analysis = JSON.parse(responseText);

    } catch (parseError) {

      console.error(
        "Gemini returned invalid JSON:"
      );

      console.error(responseText);

      throw new Error(
        "Gemini returned invalid JSON."
      );

    }


    // =================================================
    // RETURN CLEAN DATA
    // =================================================

    return {

      sentiment:
        analysis.sentiment || "neutral",

      themes:
        Array.isArray(analysis.themes)
          ? analysis.themes
          : [],

      summary:
        analysis.summary || "",

      keyIssue:
        analysis.keyIssue || "",

      recommendation:
        analysis.recommendation || "",

    };

  } catch (error) {

    console.error(
      "========== GEMINI ERROR =========="
    );

    console.error(error);

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

