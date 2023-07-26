import React, { ReactElement } from "react";
import styles from "./header.module.scss";

const Header = (): ReactElement => {
  return (
    <header className={styles.container}>
      <p className={styles.logo}>LOGO</p>
    </header>
  );
};

export default Header;
