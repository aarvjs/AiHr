// src/api/generateFeedback.js

import { GoogleGenerativeAI } from "@google/generative-ai";
import { supabase } from "../supabaseClient";

const genAI = new GoogleGenerativeAI("AIzaSyC5ohX7MWiWeDluJv1xBXTG3SPltgP_fek");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateFeedback = async (resumeId) => {
  const { data: answers, error } = await supabase
    .from("answers")
    .select("question_text, answer_text, filler_word_count")
    .eq("resume_id", resumeId)
    .order("inserted_at", { ascending: true });

  if (error || !answers || answers.length === 0) {
    return "⚠️ No answers found.";
  }

  // ✅ Total filler words
  const totalFillerWords = answers.reduce(
    (sum, item) => sum + item.filler_word_count,
    0
  );

  // ✅ Format answers into text
  const inputText = answers
    .map(
      (item, index) =>
        `Q${index + 1}: ${item.question_text}\nA${index + 1}: ${item.answer_text} (Filler Words: ${item.filler_word_count})`
    )
    .join("\n\n");

  // ✅ Optimized prompt
// ✅ Optimized prompt
const prompt = `
You are a professional HR interviewer. Below are the candidate's responses from a mock interview.

Details:
- Total filler words used: ${totalFillerWords}
- Each response includes filler word count.

Please provide the following structured feedback:

1. **Overall Communication & Confidence** (2–3 lines):
   Analyze how the candidate sounded overall — tone, clarity, and confidence.

2. **Filler Word Usage**:
   Mention if the usage is too high, moderate, or acceptable. Give ONE helpful tip to reduce filler words.

3. **Per Question Analysis**:
   For each question, briefly mention how well the candidate answered it (e.g., good structure, off-topic, lacked clarity, etc.).

4. **Improvement Suggestions**:
   - Suggest TWO short and practical ways the candidate can improve in future interviews (1 line each).

Keep your tone professional and feedback crisp.

Candidate's Responses:
${inputText}
`;



  // ✅ Get feedback from Gemini
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = await response.text();

  return text;
};
