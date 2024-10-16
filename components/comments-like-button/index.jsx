"use client";

import { BackLikeIcon, LikeIcon } from "@/helpers/icons";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import "./commentsLikeButton.css";
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
      setCommentsLike(true);
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
      setCommentsLike(false);
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
        .eq("user_id", user?.id)
        .eq("comment_id", commentId);

      if (data && data.length > 0) {
        setCommentsLike(true);
      } else {
        setCommentsLike(false);
      }

      if (error) {
        console.log(error);
      }
    };

    isCommentsLike();
  }, [commentId]);

  return (
    <button
      className="commentLikeBtn"
      onClick={() => (commentsLike ? deletePostLike() : fav())}
    >
      {commentsLike ? <BackLikeIcon /> : <LikeIcon />}
    </button>
  );
}
