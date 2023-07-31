import React, { ReactElement, useEffect } from "react";
import styles from "./currentDay.module.scss";

import Information from "./information/information";
import Menu from "./menu/menu";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { fetchWeather } from "store/slices/appSlice";

const CurrentDay = (): ReactElement => {
  const dispatch = useAppDispatch();
  const isWeatherLoading = useAppSelector(
    (state) => state.app.weather.isWeatherLoading
  );
  const location = useAppSelector((state) => state.app.userInfo.location)

  useEffect(() => {
    dispatch(fetchWeather({ info: location }));
  }, [dispatch, location]);

  return (
    <article className={styles.container} id="currentDay">
      <Information isWeatherLoading={isWeatherLoading} />

      <Menu isWeatherLoading={isWeatherLoading} />
    </article>
  );
};

export default CurrentDay;
