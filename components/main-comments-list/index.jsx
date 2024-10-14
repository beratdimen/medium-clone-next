import { createClient } from "@/utils/supabase/server";

export default async function CommentsList({ commentId }) {
  const supabase = createClient();
  let { data: comments } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", commentId);

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <p> {comment.content}</p>
        </div>
      ))}
    </div>
  );
}
