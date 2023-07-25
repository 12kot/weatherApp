import React, { ReactElement } from "react";
import CurrentDay from "./currentDay/currentDay";
import Search from "./search/search";
import About from "./about/about";
import styles from "./main.module.scss"
import Header from "components/header/header";

const Main = (): ReactElement => {
  return (
      <div className={styles.container}>
      <Header />
      <CurrentDay />
      <Search />
      <About />
    </div>
  );
};

export default Main;
