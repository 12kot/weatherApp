import React, { ReactElement } from "react";
import styles from "./currentDay.module.scss";

const CurrentDay = (): ReactElement => {
  return <div className={styles.container} id="currentDay"></div>;
};

export default CurrentDay;
