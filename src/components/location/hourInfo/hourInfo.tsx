import React, { ReactElement } from "react";
import styles from "./hourInfo.module.scss";
import { futureDay } from "types/types";
import { v4 } from "uuid";
import HourItem from "./hourItem/hourItem";
import HourItemSkeleton from "./hourItem/hourItemSkeleton";

interface Props {
  forecastday: futureDay[];
  index: number;
  isFutureLoading: boolean;
}

const HourInfo = (props: Props): ReactElement => {
  const getSkeletonHours = (count: number) => {
    return [...Array(count)].map(() => <HourItemSkeleton />)
  } 

  const getHours = (): ReactElement[] => {
    return props.forecastday[props.index]?.hour.map((item) => (
      <HourItem item={item} key={v4()} />
    ));
  };

  return (
    <aside className={styles.asideCont}>
      <article className={styles.items}>{props.isFutureLoading ? getSkeletonHours(24) : getHours()}</article>
    </aside>
  );
};

export default HourInfo;
