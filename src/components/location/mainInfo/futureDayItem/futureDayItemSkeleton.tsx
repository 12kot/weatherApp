import React from "react";
import styles from "./futureDayItem.module.scss";

const FutureDayItemSkeleton = () => {
  return (
    <div className={`${styles.item} ${styles.skeleton}`} />
  );
};

export default FutureDayItemSkeleton;
