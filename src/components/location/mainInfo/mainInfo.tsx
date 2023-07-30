import React, { ReactElement } from "react";
import styles from "./mainInfo.module.scss";
import { futureDay } from "types/types";
import { useTranslation } from "react-i18next";
import FutureDayItem from "./futureDayItem/futureDayItem";
import { v4 } from "uuid";
import FutureDayItemSkeleton from "./futureDayItem/futureDayItemSkeleton";

interface Props {
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  forecastday: futureDay[];
  time: string;
  day: string;
  isFutureLoading: boolean;
}

const MainInfo = (props: Props): ReactElement => {
  const { t } = useTranslation();

  const getSkeletonsDays = (count: number) => {
    return [...Array(count)].map(() => (
      <FutureDayItemSkeleton key={v4()} />
    ));
  }

  const getDays = (): ReactElement[] => {
    return props.forecastday.map((day, i) => (
      <FutureDayItem
        day={day}
        i={i}
        setIndex={props.setIndex}
        index={props.index}
        key={v4()}
      />
    ));
  };

  return (
    <article className={styles.mainCont}>
      <section className={styles.info}>
        <p
          className={`${styles.temp} ${
            props.isFutureLoading && styles.skeleton
          }`}
        >
          {props.isFutureLoading
            ? t("loading.smile")
            : props.forecastday[props.index]?.day.avgtemp_c}
        </p>

        <div
          className={`${styles.date} ${
            props.isFutureLoading && styles.skeleton
          }`}
        >
          <span className={styles.dateInfo}>
            <p>{props.isFutureLoading ? t("loading.oops") : props.time}</p>
            <p className={styles.day}>
              {props.isFutureLoading ? t("loading.loading") : props.day}
            </p>
          </span>
          <p>
            {props.isFutureLoading
              ? t("loading.very_soon")
              : props.forecastday[props.index]?.day.condition.text}
          </p>
        </div>
      </section>

      <section className={styles.futureInfo}>{props.isFutureLoading ? getSkeletonsDays(3) : getDays()}</section>
    </article>
  );
};

export default MainInfo;
