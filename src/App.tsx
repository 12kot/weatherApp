import React, { ReactElement, useEffect } from "react";
//import styles from "./App.module.scss";
//import Header from "components/header/header";
import { useAppDispatch } from "hooks/hooks";
import { getUserIP } from "store/slices/appSlice";
import { Route, Routes } from "react-router-dom";
import Main from "components/main/main";
import Location from "components/location/location";

const App = (): ReactElement => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserIP());
  }, [dispatch]);

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") document.body.setAttribute("dark", "");
    else document.body.removeAttribute("dark");
  }, []);

  return (
    <>
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/:location" element={<Location />} />
      </Routes>
    </>
  );
};

export default App;
