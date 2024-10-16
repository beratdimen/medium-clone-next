import { createClient } from "@/utils/supabase/server";
import "./posts.css";
import NewComments from "@/components/main-comments/page";
import CommentsList from "../main-comments-list";
import MainHeader from "../main-header";
import PostLikeButton from "../post-like-button";
import PostLikeSayisi from "../post-like-sayisi";
import BookMarksButton from "../book-marks-save-button";
import Image from "next/image";
import { Avatar } from "@/helpers/icons";

export default async function Posts() {
  const supabase = createClient();
  let { data: posts, error } = await supabase
    .from("posts")
    .select("*,  postLike(*)");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!posts) return notFound();

  // https://picsum.photos/id/237/200/300

  return (
    <div>
      <MainHeader />

      {posts.map((post) => {
        const date = new Date(post.created_at);
        const formattedDate = `${date
          .getDate()
          .toString()
          .padStart(2, "0")} ${date.toLocaleString("default", {
          month: "long",
        })} `;

        const imageUrl = `https://picsum.photos/id/${post.id + 1}/200/300`;

        return (
          <div className="postContainer" key={post.id}>
            <div className="postHeader">
              <Avatar />
              <p className="name">
                {user?.user_metadata.firstName} {user?.user_metadata.lastName}
              </p>
            </div>
            <div className="contentContainer">
              <div className="contentBody">
                <div className="content">
                  <h1>{post.title}</h1>
                  <p>{post.content}</p>
                </div>
                <Image src={imageUrl} height={100} width={100} />
              </div>
              <div className="contentFooter">
                <p>{formattedDate}</p>
                <div className="likeBtn">
                  <PostLikeButton userId={post.user_id} postId={post.id} />
                  <PostLikeSayisi postId={post.id} />
                </div>
                <BookMarksButton userId={post.user_id} postId={post.id} />
              </div>
              <CommentsList commentId={post.id} />
              <NewComments postId={post.id} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
