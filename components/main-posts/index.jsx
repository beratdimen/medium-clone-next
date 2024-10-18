import { createClient } from "@/utils/supabase/server";
import "./posts.css";
import MainHeader from "../main-header";
import PostLikeButton from "../post-like-button";
import BookMarksButton from "../book-marks-save-button";
import Image from "next/image";
import { Avatar, CommentsIcon, StarsIcon } from "@/helpers/icons";
import Link from "next/link";

export default async function Posts() {
  const supabase = createClient();
  let { data: posts, error } = await supabase
    .from("posts")
    .select("*, postLike(*)");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!posts) return notFound();

  const fetchCommentCount = async (postId) => {
    const { count } = await supabase
      .from("comments")
      .select("*", { count: "exact", head: true })
      .eq("post_id", postId);
    return count;
  };

  return (
    <div>
      <MainHeader />

      {await Promise.all(
        posts.map(async (post) => {
          const date = new Date(post.created_at);
          const formattedDate = `${date
            .getDate()
            .toString()
            .padStart(2, "0")} ${date.toLocaleString("default", {
            month: "long",
          })}`;

          const imageUrl = `https://picsum.photos/id/${post.id + 1}/200/300`;

          const commentCount = await fetchCommentCount(post.id);

          return (
            <div className="postContainer" key={post.id}>
              <Link className="postCard" href={`/posts/${post.id}`}>
                <div className="postHeader">
                  <Avatar />
                  <p className="name">
                    {user?.user_metadata.firstName}{" "}
                    <span>{user?.user_metadata.lastName}</span>
                  </p>
                </div>
                <div className="contentContainer">
                  <div className="contentBody">
                    <div className="content">
                      <h1>{post.title}</h1>
                      <p>{post.content}</p>
                    </div>
                    <Image
                      alt="imageurl post"
                      src={imageUrl}
                      height={100}
                      width={100}
                    />
                  </div>
                </div>
              </Link>
              <div className="contentFooter">
                <p className="stars">
                  <StarsIcon /> {formattedDate}
                </p>
                <div className="btns">
                  <PostLikeButton userId={post.user_id} postId={post.id} />
                  <button className="commentsBtn">
                    <CommentsIcon /> {commentCount}
                  </button>
                </div>
                <BookMarksButton userId={post.user_id} postId={post.id} />
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
