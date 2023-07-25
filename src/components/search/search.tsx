import React, { ReactElement } from "react";
import styles from "./search.module.scss";
import { useAppSelector } from "hooks/hooks";
import { useTranslation } from "react-i18next";
import CitiesMarquee from "./citiesMarquee/citiesMarquee";
import SearchInp from "./input/searchInp";
import CityItem from "./citiesMarquee/cityItem/cityItem";
import { v4 } from "uuid";

const Search = (): ReactElement => {
  const { t } = useTranslation();
  const searchCities = useAppSelector((state) => state.app.weather.searchList);
  const citiesNearby = useAppSelector(
    (state) => state.app.userInfo.citiesNearby
  );

  return (
    <div className={styles.container} id="search">
      <div className={styles.search}>
        <h1>{t("search.head")}</h1>
        <SearchInp />
      </div>

      <div className={styles.marquee}>
        <span className={styles.searchMarq}>
          {searchCities !== citiesNearby && searchCities.slice(0, 5).map((city) => <CityItem city={city} borderColor={"rgb(255, 81, 0)"} key={v4()} />)}
        </span>
        <CitiesMarquee cities={citiesNearby} rows={5} size={25} speed={15} />
      </div>
    </div>
  );
};

export default Search;
