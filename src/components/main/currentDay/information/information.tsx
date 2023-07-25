import React, { ReactElement } from "react";
import { useAppSelector } from "hooks/hooks";
import styles from "./information.module.scss";

const Information = (props: {
  getDate: (time: string) => string;
}): ReactElement => {
  const { name, localtime } = useAppSelector(
    (state) => state.app.weather.currentWeather.location
  );
  const { temp_c } = useAppSelector(
    (state) => state.app.weather.currentWeather.current
  );
  const { text, icon } = useAppSelector(
    (state) => state.app.weather.currentWeather.current.condition
  );

  return (
    <div className={styles.information}>
      <div className={styles.block_info}>

        <div className={styles.inf}>
          <p className={styles.celsius}>{temp_c}</p>
          <div className={styles.first}>
            <p>{name}</p>
            <p className={styles.block_item}>{props.getDate(localtime)}</p>
          </div>
        </div>

        <div className={styles.second}>
          <img src={icon} className={styles.img} alt="icon" />
          <p className={styles.block_item}>{text}</p>
        </div>
        
      </div>
    </div>
  );
};

export default Information;
