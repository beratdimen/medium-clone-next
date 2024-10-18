"use client";
import { SaveComments } from "./action";
import "./commentsForm.css";

export default function NewComments({ postId }) {
  return (
    <div className="commentsFormContainer">
      <form action={SaveComments}>
        <textarea
          name="content"
          id=""
          placeholder="Yorumunuzu buraya yazınız.."
        ></textarea>
        <input type="hidden" name="commentItem" value={postId} />
        <button>Yazıyı Paylaş</button>
      </form>
    </div>
  );
}
