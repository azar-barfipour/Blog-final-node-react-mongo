import { useState } from "react";

import classes from "./Register.module.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginData, setLoginData] = useState();
  const [isEmpty, setIsEmpty] = useState(false);

  const emptyEmail = email.length === 0;
  const emptyPassword = password.length === 0;
  const isValid = emptyEmail || emptyPassword;

  const emailHandler = (e) => {
    setIsEmpty(false);
    setEmail(e.target.value);
  };
  const nameHandler = (e) => {
    setIsEmpty(false);
    setName(e.target.value);
  };

  const passwordHandler = (e) => {
    setIsEmpty(false);
    setPassword(e.target.value);
  };

  const registerHandler = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setIsEmpty(true);
      return;
    }

    fetch(`${process.env.REACT_APP_API_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    })
      .then(async (response) => {
        if (!response.ok) {
          if (response.status === 400) console.log("Missing Credentials");
          else if (response.status === 403)
            console.log("Invalid email and/or password");
          else console.log("Something went wrong! Please try again...");
        } else {
          const data = await response.json();
          console.log(data);
        }
      })
      .catch();
    setEmail("");
    setPassword("");

    setEmail("");
    setPassword("");
  };

  return (
    <form onSubmit={registerHandler} className={classes["form"]}>
      <input
        onChange={nameHandler}
        type="text"
        placeholder="Name"
        className={classes["form__input"]}
        value={name}
      ></input>
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
          <small>please fill the blank</small>
        </p>
      )}
      <button
        type="submit"
        className={`${classes["form__btn"]} ${
          isValid ? classes["disabled"] : ""
        }`}
      >
        Register
      </button>
    </form>
  );
};

export default Register;
