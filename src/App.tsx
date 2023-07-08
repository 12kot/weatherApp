import React, { ReactElement, useEffect } from "react";
import styles from "./App.module.scss";
import Header from "components/header/header";
import CurrentDay from "components/currentDay/currentDay";
import Search from "components/search/search";
import About from "components/about/about";
import { useAppDispatch } from "hooks/hooks";
import { getUserIP } from "store/slices/appSlice";

const App = (): ReactElement => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserIP());
  }, [dispatch]);

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
