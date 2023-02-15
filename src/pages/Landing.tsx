import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/context";

export default function Landing() {
  const { login } = useAppContext();
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  }
  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    login();
    navigate("/users");
  }
  return (
    <div>
      <h1>Welcome</h1>
      <p>Enter details to login.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          autoComplete="email"
          value={loginDetails.email}
          onChange={handleChange}
        ></input>
        <input
          type="password"
          name="password"
          autoComplete="password"
          value={loginDetails.password}
          onChange={handleChange}
        ></input>
        <a href="#">Forgot password?</a>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}
