import { useState, useContext } from "react";
import { useCookies } from "react-cookie";
import "../index.scss";

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

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (!isLogIn && password !== confirmPassword) {
      setError("Make sure passwords match!");
      return;
    }

    const response = await fetch(
      `${process.env.REACT_APP_SERVERURL}/${endpoint}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();
    if (data.detail) {
      setError(data.detail);
    } else {
      setCookie("Email", data.email);
      setCookie("AuthToken", data.token);

      window.location.reload();
    }
  };

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
