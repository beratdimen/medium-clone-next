import OpenComments from "@/components/open-comments";
import PostLikeButton from "@/components/post-like-button";
import { StarsIcon } from "@/helpers/icons";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import "./postDetail.css";
import BookMarksButton from "@/components/book-marks-save-button";

export default async function PostDetailPage({ params }) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("posts")
    .select()
    .eq("id", params.id)
    .single();

  if (!data) return notFound();
  const date = new Date(data.created_at);
  const formattedDate = `${date
    .getDate()
    .toString()
    .padStart(2, "0")} ${date.toLocaleString("default", {
    month: "long",
  })}`;

  const imageUrl = `https://picsum.photos/id/${params.id + 1}/200/300`;

  const fetchCommentCount = async (postId) => {
    const { count } = await supabase
      .from("comments")
      .select("*", { count: "exact", head: true })
      .eq("post_id", postId);
    return count;
  };

  const commentCount = await fetchCommentCount(params.id);

  return (
    <div className="detailPostContainer">
      <div className="contentsContainer">
        <div className="contents">
          <h1>{data.title}</h1>
          <p>{data.content}</p>
        </div>
      </div>
      <div className="icons">
        <p>
          <StarsIcon /> {formattedDate}
        </p>
        <PostLikeButton userId={params.user_id} postId={params.id} />

        <OpenComments params={params} commentCount={commentCount} />
        <BookMarksButton />
      </div>

      <Image alt="imageurl post" src={imageUrl} height={200} width={200} />
    </div>
  );
}
