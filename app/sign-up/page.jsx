import { signup } from "../login/action";

export default function SignUpPage() {
  return (
    <form>
      <label htmlFor="firstName">Ad:</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        required
        placeholder="Ad"
      />
      <label htmlFor="lastName">Soyad:</label>

      <input
        id="lastName"
        name="lastName"
        type="text"
        required
        placeholder="Soyad"
      />
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button formAction={signup}>Sign up</button>
    </form>
  );
}
