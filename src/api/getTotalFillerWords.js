import { supabase } from "../supabaseClient";

export const getTotalFillerWords = async (resumeId) => {
  const { data, error } = await supabase
    .from("answers")
    .select("filler_word_count")
    .eq("resume_id", resumeId);

  if (error || !data) return 0;

  const total = data.reduce((sum, item) => sum + item.filler_word_count, 0);
  return total;
};
