import { createClient } from "@/utils/supabase/server";
import "./commentList.css";

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
          <li key={comment.id}> {comment.content}</li>
        ))}
      </ul>
    </div>
  );
}
