import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faFileText } from "@fortawesome/free-solid-svg-icons";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";

import classes from "./Header.module.css";

const Header = () => {
  const location = useLocation().pathname;
  return (
    <div className={classes["header"]}>
      <div className={classes["header__logo"]}>
        <img
          className={classes["header__image"]}
          src="https://thumbs.dreamstime.com/b/community-network-social-logo-design-template-vector-161116463.jpg"
          alt="logo"
        ></img>
        <h2 className={classes["header__title"]}>BLOG</h2>
      </div>
      <ul className={classes["nav"]}>
        <section className={classes["nav__section"]}>
          <li className={classes["nav__list"]}>
            <NavLink
              to="/"
              className={`${classes["nav__link"]} ${
                location === "/home" ? classes["nav__active"] : ""
              }`}
            >
              <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
            </NavLink>
          </li>
          <li className={classes["nav__list"]}>
            <NavLink
              to="/write"
              className={`${classes["nav__link"]} ${
                location === "/write" ? classes["nav__active"] : ""
              }`}
            >
              <FontAwesomeIcon icon={faFileText}></FontAwesomeIcon>
            </NavLink>
          </li>
        </section>
        <section>
          <li className={classes["nav__list"]}>
            <NavLink
              to="/login"
              className={`${classes["nav__link"]} ${
                location === "/login" ? classes["nav__active"] : ""
              }`}
            >
              <FontAwesomeIcon icon={faSignIn}></FontAwesomeIcon>
            </NavLink>
          </li>
        </section>
      </ul>
    </div>
  );
};

export default Header;
