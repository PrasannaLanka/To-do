import { useState, useContext } from "react";
import axios from "axios";
import UserContext from "./UserContext";
import "./App.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const user = useContext(UserContext);

  function loginUser(e) {
    e.preventDefault();

    const data = { email, password };
    axios
      .post("http://localhost:4000/Login", data, { withCredentials: true })
      .then((response) => {
        user.setEmail(response.data.email);
        setEmail("");
        setPassword("");
        setLoginError(false);
      })
      .catch(() => {
        setLoginError(true);
      });
  }

  return (
    <div className="inputbox">
      <form action="" onSubmit={(e) => loginUser(e)}>
        {loginError && <div>LOGIN ERROR! WRONG EMAIL OR PASSWORD!</div>}
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit" className="button-64">
          <span className="text">Login</span>
        </button>
      </form>
    </div>
  );
}

export default Login;
