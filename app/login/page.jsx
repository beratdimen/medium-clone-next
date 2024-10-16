import { login } from "./action";
import "./login.css";

export default function LoginPage() {
  return (
    <div className="loginContainer">
      <h2>Login Form</h2>
      <form>
        <input id="email" name="email" type="email" placeholder="E-Posta" />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="******"
        />
        <button formAction={login}>Log in</button>
      </form>
    </div>
  );
}
