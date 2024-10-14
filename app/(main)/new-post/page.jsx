export default function NewPost() {
  return (
    <form>
      <input type="text" name="title" placeholder="yazı başlığı" />
      <br />
      <textarea name="content" id="" placeholder="Yazı İçeriği"></textarea>
      <button>Yazıyı Paylaş</button>
    </form>
  );
}
