"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function PostLikeSayisi({ postId }) {
  const [postCount, setPostCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const supabase = createClient();

    const fetchPostCount = async () => {
      let { data, error } = await supabase
        .from("postLike")
        .select("*", { count: "exact" })
        .eq("post_id", postId);

      if (error) {
        setError("Problem Var kanks");
      } else {
        setPostCount(data.length);
      }
    };

    fetchPostCount();
  }, [postId]);

  return <div>{error ? <p>{error}</p> : <p>Likes: {postCount}</p>}</div>;
}
