import React from "react";
import styles from "./hourItem.module.scss";
import { hourItemType } from "types/types";

interface Props {
    item: hourItemType;
} 

const HourItem = (props: Props) => {
  return (
    <section className={`${styles.dayTime}`}>
      <p className={styles.time}>{props.item.time.split(" ")[1]}</p>
      <img src={props.item.condition.icon} alt={props.item.condition.text}></img>
      <p className={styles.value}>{props.item.temp_c}</p>
    </section>
  );
};

export default HourItem;
