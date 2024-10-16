"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function BookMarksButton({ postId }) {
  const supabase = createClient();

  const [bookMarks, setBookMarks] = useState(false);

  const addSave = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("bookMarks")
      .insert([{ user_id: user.id, post_id: postId }])
      .select();

    if (error) console.log("error :>> ", error);
  };

  const deleteSave = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("bookMarks")
      .delete()
      .eq("user_id", user.id)
      .eq("post_id", postId);

    if (error) console.log("error :>> ", error);
  };

  useEffect(() => {
    const isAddedSave = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      let { data, error } = await supabase
        .from("bookMarks")
        .select("*")
        .eq("user_id", user.id)
        .eq("post_id", postId);

      if (data.length > 0) {
        setBookMarks(true);
      }

      if (error) {
        console.log(error);
      }
    };

    isAddedSave();
  }, [postId]);

  return (
    <button onClick={() => (bookMarks ? deleteSave() : addSave())}>
      {bookMarks ? "Kaydedilenden Cıkar" : "Kaydet"}
    </button>
  );
}
