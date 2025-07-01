// src/api/generateFeedback.js

import { GoogleGenerativeAI } from "@google/generative-ai";
import { supabase } from "../supabaseClient";


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
You are an experienced HR reviewer. Analyze the candidate's interview responses.

Details:
- Total filler words used: ${totalFillerWords}
- Each answer includes individual filler word count.

Instructions:
1. Give a 2-3 line summary about their confidence and communication skills.
2. Comment on filler word usage — mention if it's too high or acceptable.
3. Give ONE tip to reduce filler words.
4. Suggest TWO short improvements (1 line each).

Be crisp, helpful, and HR-style.

Candidate's Responses:
${inputText}
`;


  // ✅ Get feedback from Gemini
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = await response.text();

  return text;
};
