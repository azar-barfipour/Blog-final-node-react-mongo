import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import Register from "../components/auth/Register";
import { UserContext } from "../context/userContext";
// import { useDispatch } from "react-redux";

import { loginActions } from "../store/auth";

const Login = () => {
  // const dispatch = useDispatch();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userContext, setUserContext] = useContext(UserContext);
  const [isEmpty, setIsEmpty] = useState(false);
  const [error, serError] = useState(false);

  const emptyEmail = email.length === 0;
  const emptyPassword = password.length === 0;
  const isValid = emptyEmail || emptyPassword;

  const navigate = useNavigate();

  const emailHandler = (e) => {
    setIsEmpty(false);
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setIsEmpty(false);
    setPassword(e.target.value);
  };

  const loginHandler = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setIsEmpty(true);
      return;
    }
    setIsEmpty(false);

    fetch(`${process.env.REACT_APP_API_URL}/api/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then(async (response) => {
        if (!response.ok) {
          if (response.status === 400) {
            serError(true);
          } else if (response.status === 403) {
            serError(true);
          } else {
            serError(true);
          }
        } else {
          const data = await response.json();
          // setUserContext(data);
          // dispatch(loginActions.login(data.token));
          serError(false);
          navigate("/");
          console.log(data);
        }
      })
      .catch();
    setEmail("");
    setPassword("");
  };

  const isRegisterHandler = (e) => {
    e.preventDefault();
    setIsRegister(!isRegister);
  };

  return (
    <div className={classes["account"]}>
      <form onSubmit={loginHandler} className={classes["form"]}>
        <input
          onChange={emailHandler}
          type="email"
          placeholder="Email"
          className={classes["form__input"]}
          value={email}
        ></input>
        <input
          onChange={passwordHandler}
          type="password"
          placeholder="Password"
          className={classes["form__input"]}
          value={password}
        ></input>
        {isEmpty && (
          <p className={classes.error}>
            <small>please insert your email or password</small>
          </p>
        )}
        {error && <p>Something went wrong! Please try again...</p>}
        <button
          type="submit"
          className={`${classes["form__btn"]} ${
            isValid ? classes["disabled"] : ""
          }`}
        >
          Login
        </button>
      </form>
      {/* create a row with or in it */}
      <hr></hr>
      <button className={classes["account__btn"]} onClick={isRegisterHandler}>
        Create your account
      </button>
      {isRegister && <Register />}
    </div>
  );
};

export default Login;
