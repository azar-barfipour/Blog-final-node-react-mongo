import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={classes["footer"]}>
      <small className={classes["footer__text"]}>
        &copy;Copyright 2022, Azar Barfipour
      </small>
    </div>
  );
};

export default Footer;
