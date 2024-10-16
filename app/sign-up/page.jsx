import { signup } from "../login/action";
import "./signUp.css";
export default function SignUpPage() {
  return (
    <div className="loginContainer">
      <h2>Sign Up Form</h2>

      <form>
        <input id="firstName" name="firstName" type="text" placeholder="Ad" />

        <input id="lastName" name="lastName" type="text" placeholder="Soyad" />
        <input id="email" name="email" type="email" placeholder="E-Posta" />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="******"
        />
        <button formAction={signup}>Sign up</button>
      </form>
    </div>
  );
}
