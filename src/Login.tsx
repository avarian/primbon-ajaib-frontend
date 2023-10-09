import { useContext, useEffect, useRef, useState } from "react";
import axios from "./api/Axios";
import AuthContext from "./context/AuthProvider";

const LOGIN_URL = "/login";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [email, setUser] = useState("");
  const [password, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

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
      // console.log(JSON.stringify(response?.data));
      // console.log(JSON.stringify(response));
      const token = response?.data?.token;
      // const roles = response?.data?.roles;
      setAuth({ email, password, token });
      setUser("");
      setPwd("");
      setSuccess(true);
    } catch (err) {
      // if (!err?.response) {
      //   setErrMsg("No Server Response");
      // } else if (err.response?.status === 400) {
      //   setErrMsg("Missing Username or Password");
      // } else if (err.response?.status === 401) {
      //   setErrMsg("Unauthorized");
      // } else {
      // }
      setErrMsg("Login Failed");
      errRef.current?.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href="#">Go to Primbon</a>
          </p>
        </section>
      ) : (
        <section>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              width: "100%",
              minHeight: "100%",
              padding: "40px",
            }}
          >
            <p
              // ref='adsd'
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-outline mb-4">
                {/* <label className="form-label" htmlFor="username">
                  Username
                </label> */}
                <input
                  className="form-control"
                  type="text"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  value={email}
                  required
                  placeholder="Email"
                />
              </div>

              <div className="form-outline mb-4">
                {/* <label className="form-label" htmlFor="password">
                  Password
                </label> */}
                <input
                  className="form-control"
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={password}
                  required
                  placeholder="Password"
                />
              </div>
              <button className="btn btn-primary btn-block mb-4">
                Sign In
              </button>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default Login;
