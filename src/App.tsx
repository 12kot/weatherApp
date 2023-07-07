import React, { ReactElement, useEffect } from "react";
import styles from "./App.module.scss";
import Header from "components/header/header";
import CurrentDay from "components/currentDay/currentDay";
import { useTranslation } from "react-i18next";
import Search from "components/search/search";
import About from "components/about/about";

const App = (): ReactElement => {
  const { i18n } = useTranslation();

  useEffect(() => {
    //i18n.changeLanguage(navigator.language);
  }, [i18n]);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <CurrentDay />
        <Search />
        <About />
      </div>
    </>
  );
};

export default App;
