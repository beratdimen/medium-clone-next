import { signout } from "@/app/login/action";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

import "./header.css";
import { AddIcon, LogoutIcon } from "@/helpers/icons";

export default async function MainHeader() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header>
      <Link href={"/"}>
        <h1>LOGO</h1>
      </Link>
      <ul>
        <Link href={"/"}>
          <li>Anasayfa</li>
        </Link>
        <Link href={"hakkimizda"}>
          <li>Hakkımızda</li>
        </Link>

        <Link href={"/posts"}>
          <li>Postlar</li>
        </Link>
        <Link href={"iletisim"}>
          <li>İletişim</li>
        </Link>
      </ul>

      {user ? (
        <ul>
          <li>
            <Link className="addPost" href={"/new-post"}>
              <p>
                Post Ekle
                <AddIcon />
              </p>
            </Link>
          </li>
          <li>
            {user.user_metadata.firstName} {user.user_metadata.lastName}
          </li>
          <li>
            <form action={signout}>
              <button>
                <LogoutIcon />
              </button>
            </form>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link href={"/login"}>Giriş Yap</Link>
          </li>
          <li>
            <Link href={"/sign-up"}>Kayıt ol</Link>
          </li>
        </ul>
      )}
    </header>
  );
}
