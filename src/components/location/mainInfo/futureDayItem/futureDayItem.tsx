import React from "react";
import styles from "./futureDayItem.module.scss";
import { futureDay } from "types/types";

interface Props {
  day: futureDay;
  i: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  index: number;
}

const FutureDayItem = (props: Props) => {
  const handleClick = (i: number) => {
    props.setIndex(i);
  };

  return (
    <div
      className={`${styles.item} ${props.i === props.index && styles.active}`}
      onClick={() => handleClick(props.i)}
    >
      <p className={styles.day}>{props.day.date.slice(5)}</p>
      <img
        src={props.day.day.condition.icon}
        alt={props.day.day.condition.text}
      ></img>
      <p className={styles.temp}>{props.day.day.avgtemp_c}</p>
    </div>
  );
};

export default FutureDayItem;
