"use client";

import { BackLikeIcon, LikeIcon } from "@/helpers/icons";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import "./postLike.css";
import PostLikeSayisi from "../post-like-sayisi";
import { toast } from "sonner";

export default function PostLikeButton({ postId }) {
  const supabase = createClient();

  const [postLike, setPostLike] = useState(false);

  const fav = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (user) {
      const { data, error } = await supabase
        .from("postLike")
        .insert([{ user_id: user?.id, post_id: postId }])
        .select();

      if (error) {
        console.log("error :>> ", error);
      } else {
        setPostLike(true);
      }
    } else {
      toast.error("Giriş Yapmalısınız");
    }
  };

  const deletePostLike = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from("postLike")
        .delete()
        .eq("user_id", user?.id)
        .eq("post_id", postId);

      if (error) {
        console.log("error :>> ", error);
      } else {
        setPostLike(false);
      }
    }
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
        .eq("user_id", user?.id)
        .eq("post_id", postId);

      if (data?.length > 0) {
        setPostLike(true);
      }

      if (error) {
        console.log(error);
      }
    };

    fetchFavMıDegilMi();
  }, [postId]);

  return (
    <>
      <button
        className="likeIcon"
        onClick={() => (postLike ? deletePostLike() : fav())}
      >
        {postLike ? <BackLikeIcon /> : <LikeIcon />}
      </button>
      <PostLikeSayisi postId={postId} postLike={postLike} />
    </>
  );
}
