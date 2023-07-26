import React, { ReactElement, useEffect } from "react";
import styles from "./currentDay.module.scss";

import Information from "./information/information";
import Menu from "./menu/menu";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { fetchWeather } from "store/slices/appSlice";

const CurrentDay = (): ReactElement => {
  const dispatch = useAppDispatch();
  const location = useAppSelector((state) => state.app.userInfo.location)

  useEffect(() => {
    dispatch(fetchWeather({ info: location }));
  }, [dispatch, location]);

  return (
    <div className={styles.container} id="currentDay">
      <Information />

      <Menu />
    </div>
  );
};

export default CurrentDay;
