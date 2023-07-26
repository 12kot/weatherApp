import React, { ReactElement } from "react";
import { useAppSelector } from "hooks/hooks";
import styles from "./information.module.scss";
import GetDate from "components/getDate/getDate";

const Information = (): ReactElement => {
  const { name, localtime } = useAppSelector(
    (state) => state.app.weather.currentWeather.location
  );
  const { temp_c } = useAppSelector(
    (state) => state.app.weather.currentWeather.current
  );
  const { text, icon } = useAppSelector(
    (state) => state.app.weather.currentWeather.current.condition
  );

  const time = GetDate({ time: localtime });

  return (
    <div className={styles.information}>
      <div className={styles.block_info}>

        <div className={styles.inf}>
          <p className={styles.celsius}>{temp_c}</p>
          <div className={styles.first}>
            <p>{name}</p>
            <p className={styles.block_item}>{time.getDate()}</p>
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
