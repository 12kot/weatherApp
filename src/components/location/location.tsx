import React, { ReactElement, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./location.module.scss";
import Header from "./header/header";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { fetchWeather } from "store/slices/appSlice";
import GetDate from "components/getDate/getDate";

const Location = (): ReactElement => {
  const { location } = useParams<keyof { location: string }>();
  const dispatch = useAppDispatch();
  const currentWeather = useAppSelector((state) => state.app.weather.currentWeather);

  const date = GetDate({time: currentWeather.location.localtime});

  useEffect(() => {
    dispatch(fetchWeather({ info: location as string }));
  }, [dispatch])

  return (
    <>
      <Header city={currentWeather.location.name} date={date.getFullDate()} />
      <main className={styles.container}>
        <article className={styles.mainCont}>
          <section className={styles.info}>
            <p className={styles.temp}>{currentWeather.current.temp_c}</p>
            <div className={styles.date}>
              <p>{date.getTime()}</p>
              <p className={styles.day}>{date.getDay()}</p>
              <p>{currentWeather.current.condition.text}</p>
            </div>
          </section>

          <section className={styles.futureInfo}>НА ПОТОМ</section>
        </article>
        <aside className={styles.asideCont}>
          <section className={styles.dayTime}>
            <p className={styles.time}>11:00</p>
            <p className={styles.value}>11</p>
          </section>
          <section className={styles.dayTime}>
            <p className={styles.time}>11:00</p>
            <p className={styles.value}>11</p>
          </section>
          <section className={styles.dayTime}>
            <p className={styles.time}>11:00</p>
            <p className={styles.value}>11</p>
          </section>
          
        </aside>
      </main>
    </>
  );
};

export default Location;
