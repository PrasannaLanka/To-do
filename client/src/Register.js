import { useState, useContext } from "react";
import axios from "axios";
import UserContext from "./UserContext";
import { Navigate } from "react-router-dom";
import "./App.css";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const user = useContext(UserContext);

  function registerUser(e) {
    e.preventDefault();

    const data = { email, password };
    axios
      .post("http://localhost:4000/register", data, { withCredentials: true })
      .then((response) => {
        user.setEmail(response.data.email);
        setEmail("");
        setPassword("");
        setRedirect(true);
      });
  }
    if (redirect) {
      return <Navigate replace to={"/"} />;
    }
  return (
    <div className="inputbox">
      <form action="" onSubmit={(e) => registerUser(e)}>
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
          <span className="text">Register</span>
        </button>
      </form>
    </div>
  );
}

export default Register;
