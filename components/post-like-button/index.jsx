"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function PostLikeButton({ postId }) {
  const supabase = createClient();

  const [postLike, setPostLike] = useState(false);

  const fav = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("postLike")
      .insert([{ user_id: user.id, post_id: postId }])
      .select();

    if (error) console.log("error :>> ", error);
  };

  const deletePostLike = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("postLike")
      .delete()
      .eq("user_id", user.id)
      .eq("post_id", postId);

    if (error) console.log("error :>> ", error);
  };

  useEffect(() => {
    const fetchFavMıDegilMi = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      let { data, error } = await supabase
        .from("postLike")
        .select("*")
        .eq("user_id", user.id)
        .eq("post_id", postId);

      if (data.length > 0) {
        setPostLike(true);
      }

      if (error) {
        console.log(error);
      }
    };

    fetchFavMıDegilMi();
  }, [postId]);

  return (
    <button onClick={() => (postLike ? deletePostLike() : fav())}>
      {postLike ? "Favdan Cıkar" : "Favla"}
    </button>
  );
}
