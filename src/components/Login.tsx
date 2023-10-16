import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "../api/Axios";
import "./Login.css";

import * as AuthService from "../services/auth.service";

const LOGIN_URL = "/login";

const Login = () => {
  // const { setAuth } = useAuth();
  // const { setAuth } = useContext(AuthContext);
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [email, setUser] = useState("");
  const [password, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  AuthService.logout();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      response.data.email = email;
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      setSuccess(true);
      navigate("/chatbox");
    } catch (err) {
      setErrMsg("Login Failed");
      errRef.current?.focus();
    }
  };

  return (
    <>
      {success ? (
        <Navigate to="/chatbox" state={{ from: location }} replace />
      ) : (
        <section>
          <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handleSubmit}>
              <div style={{ textAlign: "center", justifyContent: "center" }}>
                <img src="/src/assets/primbon-ajaib-clean.png" height={100} />
                <hr />
              </div>
              <div className="Auth-form-content">
                <h3 className="Auth-form-title">Sign In</h3>
                <p
                  ref={errRef}
                  className="badge badge-pill badge-warning"
                  style={{ color: "black" }}
                  // aria-live="assertive"
                >
                  {errMsg}
                </p>
                <div className="form-group mt-3">
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control mt-1"
                    placeholder="Enter email"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={email}
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control mt-1"
                    placeholder="Enter password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={password}
                    required
                  />
                </div>
                <div className="d-grid gap-2 mt-3">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default Login;
