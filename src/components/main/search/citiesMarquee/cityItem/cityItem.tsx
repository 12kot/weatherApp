import React, { ReactElement } from "react";
import styles from "./cityItem.module.scss";
import { useAppDispatch } from "hooks/hooks";
import { fetchWeather } from "store/slices/appSlice";
import { cityType } from "types/types";

const CityItem = (props: {
  city: cityType;

}): ReactElement => {
  const dispatch = useAppDispatch();

  const handler = (): void => {
    dispatch(
      fetchWeather({
        info: `${props.city.coords.latitude},${props.city.coords.longitude}`,
      })
    );
  };

  return (
    <a href="#currentDay" className={`${styles.item}`} onClick={handler}>
      {props.city.name}
    </a>
  );
};

export default CityItem;
