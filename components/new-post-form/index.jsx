"use client";
import { SavePost } from "@/app/(main)/new-post/action";
import "./style.css";

export default function NewPost() {
  return (
    <div className="postContainer">
      <h1>Post Ekle</h1>
      <form action={SavePost}>
        <input type="text" name="title" placeholder="yazı başlığı" />
        <br />
        <textarea name="content" id="" placeholder="Yazı İçeriği"></textarea>
        <button>Yazıyı Paylaş</button>
      </form>
    </div>
  );
}
