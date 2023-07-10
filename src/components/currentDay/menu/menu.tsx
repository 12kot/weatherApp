import React, { ReactElement, useState, useEffect } from "react";
import styles from "./menu.module.scss";
import Input from "ui/input/input";
import SearchSVG from "ui/svg/search";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { searchCity } from "store/slices/appSlice";

const Menu = (): ReactElement => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const menuActive = useAppSelector((state) => state.app.menuActive);
  const cities = useAppSelector((state) => state.app.weather.searchList);

  const {wind_kph, humidity, cloud, precip_mm} = useAppSelector((state) => state.app.weather.currentWeather.current)

  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (search.length >= 3)
      dispatch(searchCity({search}));
  }, [search, dispatch])

  const getCityList = () => {
    return cities.map((city) => <button className={styles.item} onClick={() => setSearch(city)}>{city}</button>)
  }

  return (
    <div
      className={`${menuActive && styles.active} ${styles.menu}`}
    >
      <div className={styles.search}>
        <span className={styles.inp}>
          <Input color={styles.color} value={search} setValue={setSearch} />
        </span>
        <span className={styles.search_btn}>
          <SearchSVG />
        </span>
      </div>

      <div className={styles.items}>
        {getCityList()}
      </div>

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
