"use client";

import { createClient } from "@/utils/supabase/client";
import "./commentList.css";
import CommentLikeButton from "../comments-like-button";
import { useEffect, useState } from "react";

export default function CommentsList({ commentId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function getComments() {
      const supabase = createClient();
      let { data: comments } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", commentId);
      setComments(comments);
    }
    getComments();
  }, [commentId]);

  return (
    <div className="commentListContainer">
      <ul>
        {comments?.map((comment) => (
          <li key={comment.id}>
            <p> {comment.content}</p>
            <span>
              <CommentLikeButton
                userId={comment.user_id}
                commentId={comment.id}
              />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
