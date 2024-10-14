import { SavePost } from "./action";

export default function NewPost() {
  return (
    <form action={SavePost}>
      <input type="text" name="title" placeholder="yazı başlığı" />
      <br />
      <textarea name="content" id="" placeholder="Yazı İçeriği"></textarea>
      <button>Yazıyı Paylaş</button>
    </form>
  );
}
