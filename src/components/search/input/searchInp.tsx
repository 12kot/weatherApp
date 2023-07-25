import React, { ReactElement, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import InputSearch from "ui/inputSearch/inputSearch";
import styles from "./searchInp.module.scss";
import { searchCity } from "store/slices/appSlice";
import { useAppDispatch } from "hooks/hooks";

const SearchInp = (): ReactElement => {
  const { t } = useTranslation();
  const [search, setSearch] = useState<string>("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (search.length >= 3) dispatch(searchCity({ search }));
  }, [search, dispatch]);

  return (
    <span className={styles.inp}>
      <InputSearch
        placeholder={t("search.inp")}
        value={search}
        setValue={setSearch}
      />
    </span>
  );
};

export default SearchInp;
