import React, { ReactElement, useState } from "react";
import styles from "./search.module.scss";
import { useAppSelector } from "hooks/hooks";
import { useTranslation } from "react-i18next";
import CitiesMarquee from "./citiesMarquee/citiesMarquee";
import SearchInp from "./input/searchInp";
import { v4 } from "uuid";
import { NavLink } from "react-router-dom";

const Search = (): ReactElement => {
  const { t } = useTranslation();
  const [search, setSearch] = useState<string>("");
  
  const { searchList, isSearchLoading } = useAppSelector(
    (state) => state.app.weather.search
  );
  const { citiesNearby, isNearbyLoading } = useAppSelector(
    (state) => state.app.userInfo.citiesNearby
  );

  const getSkeletonsItems = (count: number): ReactElement[] => {
    return [...Array(count)].map(() => (
      <div className={`${styles.item} ${styles.skeleton}`} key={v4()} />
    ));
  };

  const getSearchList = () =>
    searchList.slice(0, 5).map((city) => (
      <NavLink className={styles.item} to={city.name} key={v4()}>
        {city.name}
      </NavLink>
    ));

  return (
    <div className={styles.container} id="search">
      <div className={styles.search}>
        <h1>{t("search.head")}</h1>
        <SearchInp search={search} setSearch={setSearch} canSearch={!searchList.length || isSearchLoading} />
      </div>

      <div className={styles.marquee}>
        <span className={styles.searchMarq}>
          {search.length < 3 ? (
            <p className={styles.item}>{t("search.startInput")}</p>
          ) : !searchList.length ? (
            <p className={styles.item}>{t("search.undefined")}</p>
          ) : (
            isSearchLoading ? getSkeletonsItems(3) : getSearchList()
          )}
        </span>

        <CitiesMarquee isNearbyLoading={isNearbyLoading} cities={citiesNearby} rows={5} size={25} speed={15} />
      </div>
    </div>
  );
};

export default Search;
