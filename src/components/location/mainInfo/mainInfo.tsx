import React, { ReactElement } from "react";
import styles from "./mainInfo.module.scss";
import { v4 } from "uuid";
import { futureDay } from "types/types";

interface Props {
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  forecastday: futureDay[];
  time: string;
  day: string;
}

const MainInfo = (props: Props): ReactElement => {
  const handleClick = (i: number) => {
    props.setIndex(i);
  };

  const getDays = (): ReactElement[] => {
    return props.forecastday.map((day, i) => (
      <div
        className={`${styles.item} ${i === props.index && styles.active}`}
        onClick={() => handleClick(i)}
        key={v4()}
      >
        <p className={styles.day}>{day.date.slice(5)}</p>
        <img src={day.day.condition.icon} alt={day.day.condition.text}></img>
        <p className={styles.temp}>{day.day.avgtemp_c}</p>
      </div>
    ));
  };

  return (
    <article className={styles.mainCont}>
      <section className={styles.info}>
        <p className={styles.temp}>
          {props.forecastday[props.index]?.day.avgtemp_c}
        </p>

        <div className={styles.date}>
          <span className={styles.dateInfo}>
            <p>{props.time}</p>
            <p className={styles.day}>{props.day}</p>
          </span>
          <p>{props.forecastday[props.index]?.day.condition.text}</p>
        </div>
      </section>

      <section className={styles.futureInfo}>{getDays()}</section>
    </article>
  );
};

export default MainInfo;
