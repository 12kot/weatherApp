import React, { ReactElement, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import InputSearch from "ui/inputSearch/inputSearch";
import styles from "./searchInp.module.scss";
import { searchCity } from "store/slices/appSlice";
import { useAppDispatch } from "hooks/hooks";
import { useNavigate } from "react-router-dom";

const SearchInp = (): ReactElement => {
  const { t } = useTranslation();
  const [search, setSearch] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigator = useNavigate();

  useEffect(() => {
    if (search.length >= 3) dispatch(searchCity({ search }));
  }, [search, dispatch]);

  const handleSearch = (): void => {
    if (search.length >= 3) navigator(search);
  }

  return (
    <span className={styles.inp}>
      <InputSearch
        placeholder={t("search.inp")}
        value={search}
        setValue={setSearch}
        handleClick={handleSearch}
      />
    </span>
  );
};

export default SearchInp;
