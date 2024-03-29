import React, { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./location.module.scss";
import Header from "./header/header";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { fetchFutureWeather } from "store/slices/appSlice";
import GetDate from "hooks/useGetDate";
import MainInfo from "./mainInfo/mainInfo";
import HourInfo from "./hourInfo/hourInfo";
import NotFound from "components/notFound/notFound";
import PageLoader from "ui/loaders/pageLoader/pageLoader";

const Location = (): ReactElement => {
  const { location } = useParams<keyof { location: string }>();
  const dispatch = useAppDispatch();
  const [index, setIndex] = useState<number>(0);
  const { futureWeather, isFutureLoading } = useAppSelector((state) => state.app.weather.futureWeather);
  const isFutureError: boolean = useAppSelector((state) => state.app.weather.futureWeather.isError)

  const date = GetDate({ time: futureWeather.current.last_updated });

  useEffect(() => {
    dispatch(fetchFutureWeather({ info: location as string }));
  }, [dispatch, location, localStorage.getItem("i18nextLng")]);

  if(isFutureLoading) return <PageLoader />
  if(isFutureError) return <NotFound />


  return (
    <>
      <Header city={futureWeather.location.name} date={date.getFullDate()} isFutureLoading={isFutureLoading}/>
      <main className={styles.container}>
        <MainInfo
          index={index}
          setIndex={setIndex}
          forecastday={futureWeather.forecast.forecastday}
          time={date.getTime()}
          day={date.getDay(index)}
          isFutureLoading={isFutureLoading}
        />

        <HourInfo
          forecastday={futureWeather.forecast.forecastday}
          isFutureLoading={isFutureLoading}
          index={index}
        />
      </main>
    </>
  );
};

export default Location;
