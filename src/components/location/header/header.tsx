import React, { ReactElement } from "react";
import styles from "./header.module.scss";
import { NavLink } from "react-router-dom";
import ChooseLanguage from "components/header/components/chooseLanguage";
import ChooseTheme from "components/header/components/chooseTheme";

interface Props {
  city: string;
  date: string;
}

const Header = (props: Props): ReactElement => {
  return (
    <header className={styles.container}>
      <NavLink to="/" className={styles.logo}>LOGO</NavLink>
      <p>{props.date}</p>
      <p>{props.city}</p>
      <span className={styles.settings}>
        <ChooseLanguage />
        <ChooseTheme />
      </span>
    </header>
  );
};

export default Header;
