import { supabase } from '../supabaseClient';

export const createRoom = async (roomId, type) => {
  const { data, error } = await supabase
    .from("video_rooms")
    .insert([
      {
        room_id: roomId,
        created_by: "system",  // 🔥 Static value instead of user email
        type: type
      }
    ]);
  return { data, error };
};
