import { SaveComments } from "./action";

export default function NewComments({ postId }) {
  console.log(postId + "sdsdasad");
  return (
    <form action={SaveComments}>
      <textarea name="content" id="" placeholder="Yazı İçeriği"></textarea>
      <input type="hidden" name="commentItem" value={postId} />
      <button>Yazıyı Paylaş</button>
    </form>
  );
}
