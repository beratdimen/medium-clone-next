"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function CommentLikeButton({ commentId }) {
  const supabase = createClient();
  const [commentsLike, setCommentsLike] = useState(false);

  const fav = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("commentsLike")
      .insert([{ user_id: user.id, comment_id: commentId }])
      .select();

    if (error) {
      console.log("error :>> ", error);
    } else {
      setCommentsLike(true); // Favori ekleme sonrası durumu güncelle
    }
  };

  const deletePostLike = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("commentsLike")
      .delete()
      .eq("user_id", user.id)
      .eq("comment_id", commentId);

    if (error) {
      console.log("error :>> ", error);
    } else {
      setCommentsLike(false); // Favori çıkarma sonrası durumu güncelle
    }
  };

  useEffect(() => {
    const isCommentsLike = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      let { data, error } = await supabase
        .from("commentsLike")
        .select("*")
        .eq("user_id", user.id)
        .eq("comment_id", commentId);

      if (data && data.length > 0) {
        setCommentsLike(true); // Eğer kullanıcı bu yorumu beğendiyse, durumu güncelle
      } else {
        setCommentsLike(false); // Aksi durumda false olarak ayarla
      }

      if (error) {
        console.log(error);
      }
    };

    isCommentsLike();
  }, [commentId]);

  return (
    <button onClick={() => (commentsLike ? deletePostLike() : fav())}>
      {commentsLike ? "Favdan Çıkar" : "Favla"}
    </button>
  );
}
