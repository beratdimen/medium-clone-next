import { createClient } from "@/utils/supabase/server";
import "./posts.css";
import NewComments from "@/components/main-comments/page";
import CommentsList from "../main-comments-list";
import MainHeader from "../main-header";
import PostLikeButton from "../post-like-button";
import PostLikeSayisi from "../post-like-sayisi";
import BookMarksButton from "../book-marks-save-button";

export default async function Posts() {
  const supabase = createClient();
  let { data: posts, error } = await supabase
    .from("posts")
    .select("*, postLike(*)");

  console.log("posts :>> ", posts);
  if (!posts) return notFound();

  return (
    <div>
      <MainHeader />

      {posts.map((post) => {
        const date = new Date(post.created_at);
        const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(
          date.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}/${date.getFullYear()} ${date
          .getHours()
          .toString()
          .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;

        return (
          <div className="postContainer" key={post.id}>
            <h1>{post.title}</h1>
            <div className="content">
              <p>{post.content}</p>
              <p>{formattedDate}</p>
              Favlama sayısı <PostLikeSayisi postId={post.id} />
              <PostLikeButton userId={post.user_id} postId={post.id} />
              <CommentsList commentId={post.id} />
              <NewComments postId={post.id} />
            </div>
            <BookMarksButton userId={post.user_id} postId={post.id} />
          </div>
        );
      })}
    </div>
  );
}
