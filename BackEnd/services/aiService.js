import { GoogleGenAI } from "@google/genai"

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const analyzeFeedbackWithAI = async (message) => {
  try {
    console.log("Sending feedback to Gemini...");

    const interaction = await ai.interactions.create({
      model: "gemini-3.6-flash",

      input: `
Analyze the following customer feedback for Project LOOP.

Customer feedback:
${message}
`,

      response_format: {
        type: "text",
        mime_type: "application/json",

        schema: {
          type: "object",

          properties: {
            sentiment: {
              type: "string",
              enum: [
                "positive",
                "neutral",
                "negative"
              ]
            },

            themes: {
              type: "array",
              items: {
                type: "string"
              }
            },

            summary: {
              type: "string"
            },

            keyIssue: {
              type: "string"
            },

            recommendation: {
              type: "string"
            }
          },

          required: [
            "sentiment",
            "themes",
            "summary",
            "keyIssue",
            "recommendation"
          ]
        }
      }
    });

    console.log("Gemini response received");

    const analysis = JSON.parse(
      interaction.output_text
    );

    return analysis;

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

export {
  analyzeFeedbackWithAI,
}