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

  const { wind_kph, humidity, cloud, precip_mm } = useAppSelector(
    (state) => state.app.weather.currentWeather.current
  );

  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (search.length >= 2) dispatch(searchCity({ search }));
  }, [search, dispatch]);

  const getCityList = (): ReactElement[] => {
    if ((search.length === 0 && cities.length === 1) || cities.length === 0)
      return citiesNearby.map((city) => (
        <button className={styles.item} onClick={() => setSearch(city.name + ", " + city.region)} key={v4()}>
          {city.name + ", " + city.region}
        </button>
      ));

    return cities.map((city) => (
      <button className={styles.item} onClick={() => setSearch(city.name + ", " + city.region)} key={v4()}>
        {city.name + ", " + city.region}
      </button>
    ));
  };

  const handleSearch = () => {
    document.body.removeAttribute("no_scroll");

    dispatch(fetchWeather({ city: search }));
    dispatch(menuHandler(false));
    
    setSearch("");
  };

  return (
    <div className={`${menuActive && styles.active} ${styles.menu}`}>
      <div className={styles.search}>
        <span className={styles.inp}>
          <Input color={styles.color} value={search} setValue={setSearch} />
        </span>
        <button className={`${styles.search_btn} ${isLoading && styles.loading}`} onClick={handleSearch} disabled={isLoading}>
            <SearchSVG />
        </button>
      </div>

      <div className={styles.items}>{getCityList()}</div>

      <hr />

      <div className={styles.details}>
        <h4>{t("menu.weather_details")}</h4>
        <div className={styles.details_items}>
          <span className={styles.d_item}>
            <p className={styles.key}>{t("menu.cloudy")}</p>
            <p className={styles.value}>{cloud}%</p>
          </span>
          <span className={styles.d_item}>
            <p className={styles.key}>{t("menu.humidity")}</p>
            <p className={styles.value}>{humidity}%</p>
          </span>
          <span className={styles.d_item}>
            <p className={styles.key}>{t("menu.wind")}</p>
            <p className={styles.value}>{wind_kph + t("weather.km/h")}</p>
          </span>
          <span className={styles.d_item}>
            <p className={styles.key}>{t("menu.rain")}</p>
            <p className={styles.value}>{precip_mm + t("weather.mm")}</p>
          </span>
        </div>
      </div>

      <hr />
    </div>
  );
};

export default Menu;
