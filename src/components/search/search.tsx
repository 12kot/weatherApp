import React, { ReactElement } from "react";
import styles from "./search.module.scss";
import Marquee from "react-fast-marquee";
import { useAppSelector } from "hooks/hooks";
import CityItem from "./cityItem/cityItem";
import { v4 } from "uuid";
import { useTranslation } from "react-i18next";
import { cityType } from "types/types";
import InputSearch from "ui/inputSearch/inputSearch";

const Search = (): ReactElement => {
  const { t } = useTranslation();
  const cities = useAppSelector((state) => state.app.userInfo.citiesNearby);

  const getItem = (): ReactElement[] => {
    const elements: cityType[] = [];

    if (cities.length !== 0)
      for (let i = 0; i < 25; i++) {
        const randValue = Math.floor(Math.random() * cities.length);
        elements.push(cities[randValue]);
      }

    return elements.map((city) => <CityItem city={city} key={v4()} />);
  };

  const getMarquees = (): ReactElement[] => {
    const marquues: ReactElement[] = [];

    for (let i = 0; i < 5; i++) {
      marquues.push(
        <Marquee
          direction={!(i % 2) ? "right" : "left"}
          pauseOnHover
          speed={!(i % 2) ? 30 : 15}
          key={v4()}
        >
          <div className={styles.carousel_item}>{getItem()}</div>
        </Marquee>
      );
    }

    return marquues;
  };

  return (
    <div className={styles.container} id="search">
      <div className={styles.search}>
        <h1>{t("search.head")}</h1>
        <span className={styles.inp}>
          <InputSearch placeholder={t("search.inp")} />
        </span>
      </div>

      <div className={styles.carousel}>{getMarquees()}</div>
    </div>
  );
};

export default Search;
