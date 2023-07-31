import React, { ReactElement, useEffect } from "react";
import { useTranslation } from "react-i18next";
import InputSearch from "ui/inputSearch/inputSearch";
import styles from "./searchInp.module.scss";
import { searchCity } from "store/slices/appSlice";
import { useAppDispatch } from "hooks/hooks";
import { useNavigate } from "react-router-dom";

const SearchInp = (props: {
  canSearch: boolean;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>
}): ReactElement => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigator = useNavigate();

  useEffect(() => {
    if (props.search.length >= 3) dispatch(searchCity({ search: props.search }));
  }, [props.search, dispatch]);

  const handleSearch = (): void => {
    if (props.search.length >= 3 && !props.canSearch) navigator(`loc/${props.search}`);
  }

  return (
    <span className={styles.inp}>
      <InputSearch
        placeholder={t("search.inp")}
        value={props.search}
        setValue={props.setSearch}
        handleClick={handleSearch}
        isActive={!props.canSearch}
      />
    </span>
  );
};

export default SearchInp;
