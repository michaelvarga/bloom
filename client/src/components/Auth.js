import { useState, useContext } from "react";
import { useCookies } from "react-cookie";
import "../index.scss";
import axios from "axios";

const Auth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [isLogIn, setIsLogin] = useState(true);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);

  const viewLogin = (status) => {
    setError(null);
    setIsLogin(status);
  };

  const authenticate = async (username, password, method) => {
    console.log("AUTHENTICATING...")
    try {
      const response = await axios.post(`http://localhost:8080/auth/${method}`, {
        username, password
      })
      setCookie("AuthToken", response.data.token)
      console.log("AUTH COOKIE", response.data.token)
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (!isLogIn && password !== confirmPassword) {
      setError("Make sure passwords match!");
      return;
    }

    // authenticate(email, password, endpoint)
    // console.log("FETCHING")
    // const response = await axios.post(
    //   // `${process.env.REACT_APP_SERVERURL}/${endpoint}`,
    //   `http://localhost:8080/auth/${endpoint}`,
    //   {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ username: email, password }),
    //   }
    // );

    // const data = await response.json();
    // if (data.detail) {
    //   setError(data.detail);
    // } else {
    //   // setCookie("Email", data.email);
    //   setCookie("Email", data.username);
    //   setCookie("AuthToken", data.token);
    //   console.log("SUCCESS!", data.username, data.token)
    //   window.location.reload();
    }
    // try {
    //   const response = await axios.post(`http://localhost:8080/auth/${endpoint}`)
    // } catch (err) {
    //   console.error(err)
    // }
  // };

  return (
    <div className="d-flex justify-content-center auth-container">
      <div className="login-form">
        <form className="d-flex row">
          <h2>{isLogIn ? "Log In" : "Sign Up"}</h2>
          <label>
            Email Address
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
            />
          </label>
          <label htmlFor="">
            Password
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {!isLogIn && (
            <label>
              Confirm Password
              <input
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
          )}
        </form>
        <div className="d-flex align-items-center justify-content-between">
          <button
            type="submit"
            onClick={(e) => handleSubmit(e, isLogIn ? "login" : "signup")}
          >
            Submit
          </button>
          {error && <p>{error}</p>}
          <div>
            {isLogIn ? (
              <span onClick={() => viewLogin(false)}>
                New here? Sign up now.
              </span>
            ) : (
              <span onClick={() => viewLogin(true)}>
                Already have an account? Sign in.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
