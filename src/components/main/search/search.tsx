import React, { ReactElement } from "react";
import styles from "./search.module.scss";
import { useAppSelector } from "hooks/hooks";
import { useTranslation } from "react-i18next";
import CitiesMarquee from "./citiesMarquee/citiesMarquee";
import SearchInp from "./input/searchInp";
import { v4 } from "uuid";
import { NavLink } from "react-router-dom";

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
          {searchCities === citiesNearby ? (
            <p className={styles.item}>{t("search.startInput")}</p>
          ) : searchCities.length === 0 ? (
            <p className={styles.item}>{t("search.undefined")}</p>
          ) : (
            searchCities.slice(0, 5).map((city) => (
              <NavLink className={styles.item} to={city.name} key={v4()}>
                {city.name}
              </NavLink>
            ))
          )}
        </span>

        <CitiesMarquee cities={citiesNearby} rows={5} size={25} speed={15} />
      </div>
    </div>
  );
};

export default Search;
