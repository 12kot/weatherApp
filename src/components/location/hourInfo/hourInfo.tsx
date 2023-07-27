import React, { ReactElement } from "react";
import styles from "./hourInfo.module.scss";
import { futureDay } from "types/types";
import { v4 } from "uuid";

interface Props {
  forecastday: futureDay[];
  index: number;
}

const HourInfo = (props: Props): ReactElement => {
  const getHours = (): ReactElement[] => {
    return props.forecastday[props.index]?.hour.map((item) => (
      <section className={styles.dayTime} key={v4()}>
        
        <p className={styles.time}>{item.time.split(" ")[1]}</p>
        <img src={item.condition.icon} alt={item.condition.text}></img>
        <p className={styles.value}>{item.temp_c}</p>
      
    </section>
    ));
  };

  return (
    <aside className={styles.asideCont}>
      <div className={styles.items}>{getHours()}</div>
    </aside>
  );
};

export default HourInfo;
