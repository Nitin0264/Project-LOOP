export const appName = "Project LOOP";

export const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

export const sentimentClass = (sentiment) => {
  if (sentiment === "positive") return "positive";
  if (sentiment === "negative") return "negative";
  return "neutral";
};