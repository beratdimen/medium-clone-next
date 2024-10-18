"use client";

import { BackSaveIcon, SaveIcon } from "@/helpers/icons";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import "./bookMarks.css";

export default function BookMarksButton({ postId }) {
  const supabase = createClient();

  const [bookMarks, setBookMarks] = useState(false);

  const addSave = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (user) {
      const { data, error } = await supabase
        .from("bookMarks")
        .insert([{ user_id: user?.id, post_id: postId }])
        .select();

      if (error) {
        console.log("error :>> ", error);
      } else {
        setBookMarks(true);
      }
      toast.success("Kaydedildi");
    } else {
      toast.error("Giriş Yapmalısınız");
    }
  };

  const deleteSave = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("bookMarks")
      .delete()
      .eq("user_id", user?.id)
      .eq("post_id", postId);

    if (error) {
      console.log("error :>> ", error);
    } else {
      setBookMarks(false);
    }
    toast.info("Kaydedililenlerden Çıkarıldı");
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
        .eq("user_id", user?.id)
        .eq("post_id", postId);

      if (data?.length > 0) {
        setBookMarks(true);
      }

      if (error) {
        console.log(error);
      }
    };

    isAddedSave();
  }, [postId]);

  return (
    <button
      className="saveBtn"
      onClick={() => (bookMarks ? deleteSave() : addSave())}
    >
      {bookMarks ? <BackSaveIcon /> : <SaveIcon />}
    </button>
  );
}
