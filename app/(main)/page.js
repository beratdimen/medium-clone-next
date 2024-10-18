import { AddIcon, LoginIcon } from "@/helpers/icons";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import "./style.css";
export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user);

  return (
    <div className="homeContainer">
      <h1>Medium Clone Sayfama Hoşgeldiniz </h1>
      <p>
        Sizlerde yazılarınızı ,görüşlerinizi paylaşın ve fikirler alın başlamak
        için aşağıdaki butona basabilirsiniz
      </p>
      {user ? (
        <div className="addPost">
          <Link href={"/new-post"}>
            <p>
              Post Ekle
              <AddIcon />
            </p>
          </Link>
        </div>
      ) : (
        <div className="addPost">
          <Link href={"/login"}>
            <p>
              Giriş Yap
              <LoginIcon />
            </p>
          </Link>
        </div>
      )}
    </div>
  );
}
