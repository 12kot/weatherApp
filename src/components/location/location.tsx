import React, { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./location.module.scss";
import Header from "./header/header";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { fetchFutureWeather } from "store/slices/appSlice";
import GetDate from "components/getDate/getDate";
import { v4 } from "uuid";

const Location = (): ReactElement => {
  const { location } = useParams<keyof { location: string }>();
  const dispatch = useAppDispatch();
  const [index, setIndex] = useState<number>(0);
  const { futureWeather } = useAppSelector((state) => state.app.weather);

  const date = GetDate({ time: futureWeather.current.last_updated });

  useEffect(() => {
    dispatch(fetchFutureWeather({ info: location as string }));
  }, [dispatch, location]);

  const getHours = (): ReactElement[] => {
    return futureWeather.forecast.forecastday[index]?.hour.map((item) => (
      <section className={styles.dayTime} key={v4()}>
        <p className={styles.time}>{item.time.split(" ")[1]}</p>
        <p className={styles.value}>{item.temp_c}</p>
      </section>
    ));
  };

  const handleClick = (i: number) => {
    setIndex(i);
  }

  const getDays = (): ReactElement[] => {
    return futureWeather.forecast.forecastday.map((day, i) => (
      <div className={`${styles.item} ${i === index && styles.active}`} onClick={() => handleClick(i)} key={v4()}>
        <p className={styles.day}>{day.date.slice(5)}</p>
        <p className={styles.temp}>{day.day.avgtemp_c}</p>
      </div>
    ));
  };

  return (
    <>
      <Header city={futureWeather.location.name} date={date.getFullDate()} />
      <main className={styles.container}>
        <article className={styles.mainCont}>
          <section className={styles.info}>
            <p className={styles.temp}>
              {futureWeather.forecast.forecastday[index]?.day.avgtemp_c}
            </p>
            <div className={styles.date}>
              <p>{date.getTime()}</p>
              <p className={styles.day}>{date.getDay(index)}</p>
              <p>
                {futureWeather.forecast.forecastday[index]?.day.condition.text}
              </p>
            </div>
          </section>

          <section className={styles.futureInfo}>{getDays()}</section>
        </article>
        <aside className={styles.asideCont}>
          <div className={styles.items}>{getHours()}</div>
        </aside>
      </main>
    </>
  );
};

export default Location;
