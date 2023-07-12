import React, { ReactElement, useState, useEffect } from "react";
import styles from "./menu.module.scss";
import Input from "ui/input/input";
import SearchSVG from "ui/svg/search";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { fetchWeather, menuHandler, searchCity } from "store/slices/appSlice";
import { v4 } from "uuid";

const Menu = (): ReactElement => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const menuActive = useAppSelector((state) => state.app.menuActive);

  const cities = useAppSelector((state) => state.app.weather.searchList);
  const isLoading = useAppSelector((state) => state.app.weather.isLoading);

  const citiesNearby = useAppSelector(
    (state) => state.app.userInfo.citiesNearby
  );

  const {
    wind_kph,
    humidity,
    cloud,
    precip_mm,
    feelslike_c,
    wind_dir,
    gust_kph,
  } = useAppSelector((state) => state.app.weather.currentWeather.current);

  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (search.length >= 3) dispatch(searchCity({ search }));
  }, [search, dispatch]);

  const getCityList = (): ReactElement[] => {
    if ((search.length === 0 && cities.length === 1) || cities.length === 0)
      return citiesNearby.map((city) => (
        <button
          className={styles.item}
          onClick={() =>
            handleSearch(`${city.coords.latitude},${city.coords.longitude}`)
          }
          key={v4()}
        >
          {city.name}
        </button>
      ));

    return cities.map((city) => (
      <button
        className={styles.item}
        onClick={() =>
          handleSearch(`${city.coords.latitude},${city.coords.longitude}`)
        }
        key={v4()}
      >
        {city.name}
      </button>
    ));
  };

  const getWeatherDetails = (): ReactElement[] => {
    const details: { key: string; value: string }[] = [
      { key: t("menu.feelslike"), value: feelslike_c + "°" },
      { key: t("menu.gust"), value: gust_kph + t("weather.km/h") },
      { key: t("menu.wind"), value: wind_kph + t("weather.km/h") },
      { key: t("menu.wind_dir"), value: wind_dir },
      { key: t("menu.humidity"), value: humidity + "%" },
      { key: t("menu.rain"), value: precip_mm + t("weather.mm") },
      { key: t("menu.cloudy"), value: cloud + "%" },
    ];

    return details.map((item) => (
      <span className={styles.d_item} key={v4()}>
        <p className={styles.key}>{item.key}</p>
        <p className={styles.value}>{item.value}</p>
      </span>
    ));
  };

  const handleSearch = (info: string): void => {
    document.body.removeAttribute("no_scroll");

    dispatch(fetchWeather({ info }));
    dispatch(menuHandler(false));

    setSearch("");
  };

  return (
    <div className={`${menuActive && styles.active} ${styles.menu}`}>
      <div className={styles.search}>
        <span className={styles.inp}>
          <Input color={styles.color} value={search} setValue={setSearch} />
        </span>
        <button
          className={`${styles.search_btn} ${(isLoading || search.length < 3)  && styles.loading}`}
          onClick={() => handleSearch(search)}
          disabled={isLoading || search.length < 3}
        >
          <SearchSVG />
        </button>
      </div>

      <div className={styles.items}>{getCityList()}</div>

      <hr />

      <div className={styles.details}>
        <h4>{t("menu.weather_details")}</h4>
        <div className={styles.details_items}>
          {getWeatherDetails()}
        </div>
      </div>

      <hr />
    </div>
  );
};

export default Menu;
