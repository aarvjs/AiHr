import { supabase } from "../supabaseClient";

export const createAnswer = async ({
  resume_id,
  question_index,
  question_text,
  answer_text,
  filler_word_count,
}) => {
  const { error } = await supabase.from("answers").insert([
    {
      resume_id,
      question_index,
      question_text,
      answer_text,
      filler_word_count,
    },
  ]);

  if (error) {
    console.error("❌ Error inserting answer:", error);
  } else {
    console.log("✅ Answer stored successfully!");
  }
};
