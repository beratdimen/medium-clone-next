import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function MainHeader() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header>
      <ul>
        <li>Anasayfa</li>
        <li>Hakkımızda</li>
        <li>İletişim</li>

        {user ? (
          <ul>
            <li>Hoş geldin , {user.email}</li>
            <li>
              <button>Çıkış Yap</button>
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
      </ul>
    </header>
  );
}
