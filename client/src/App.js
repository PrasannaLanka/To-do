import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Register from "./Register";
import UserContext from "./UserContext";
import axios from "axios";
import Login from "./Login";
import Home from "./Home";

function App() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/user", { withCredentials: true })
      .then((response) => {
        setEmail(response.data.email);
      });
  }, []);

  function logout() {
    axios
      .post("http://localhost:4000/logout", {}, { withCredentials: true })
      .then(() => setEmail(""));
  }

  return (
    <UserContext.Provider value={{ email, setEmail }}>
      <BrowserRouter>
        <nav
          id="mainNavbar"
          className="navbar navbar-dark navbar-expand-md py-0 fixed-top"
        >
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
              {!email && (
                <>
                  <li className="nav-item">
                    <Link to="/" className="nav-link">
                      HOME
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/login"} className="nav-link">
                      LOGIN
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/register"} className="nav-link">
                      REGISTER
                    </Link>
                  </li>
                </>
              )}

              {!!email && (
                <>
                  <li className="nav-item">
                  
                    <Link to="/" className="nav-link">
                      HOME
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      onClick={(e) => {
                        e.preventDefault();
                        logout();
                      }}
                      href="/"
                    >
                      LOGOUT
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>

        <main style={{ marginTop: "10em" }}>
          <Routes>
            <Route exact path={"/"} element={<Home />} />
            <Route exact path={"/register"} element={<Register />} />
            <Route exact path={"/login"} element={<Login />} />
          </Routes>
        </main>
      </BrowserRouter>
    </UserContext.Provider>
    
  );
}

export default App;
