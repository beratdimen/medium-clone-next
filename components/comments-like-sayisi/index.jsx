"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function CommentLikeSayisi({ commentId }) {
  const [commentsCount, setCommentsCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const supabase = createClient();

    const fetchcommentsCount = async () => {
      let { data, error } = await supabase
        .from("commentsLike")
        .select("*", { count: "exact" })
        .eq("comment_id", commentId);

      if (error) {
        setError("Problem Var kanks");
        console.log(error);
      } else {
        setCommentsCount(data.length);
      }
    };

    fetchcommentsCount();
  }, [commentId]);

  return <div>{error ? <p>{error}</p> : <p>Likes: {commentsCount}</p>}</div>;
}
