import { signout } from "@/app/login/action";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

import "./header.css";

export default async function MainHeader() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header>
      <h1>LOGO</h1>
      <ul>
        <li>Anasayfa</li>
        <li>Hakkımızda</li>
        <li>Postlar</li>
        <li>İletişim</li>
      </ul>

      {user ? (
        <ul>
          <li>Hoş geldin , {user.email}</li>
          <li>
            <form action={signout}>
              <button>Çıkış Yap</button>
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
