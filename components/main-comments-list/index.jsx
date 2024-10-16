import { createClient } from "@/utils/supabase/server";
import "./commentList.css";
import CommentLikeButton from "../comments-like-button";
import CommentLikeSayisi from "../comments-like-sayisi";

export default async function CommentsList({ commentId }) {
  const supabase = createClient();
  let { data: comments } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", commentId);

  return (
    <div className="commentListContainer">
      <ul>
        {comments.map((comment) => (
          <ul key={comment.id}>
            <li> {comment.content}</li>
            <CommentLikeButton
              userId={comment.user_id}
              commentId={comment.id}
            />
            <CommentLikeSayisi commentId={comment.id} />
          </ul>
        ))}
      </ul>
    </div>
  );
}
