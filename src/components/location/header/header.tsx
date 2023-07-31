import React, { ReactElement } from "react";
import styles from "./header.module.scss";
import { NavLink } from "react-router-dom";
import ChooseLanguage from "components/header/components/chooseLanguage";
import ChooseTheme from "components/header/components/chooseTheme";
import { useTranslation } from "react-i18next";

interface Props {
  city: string;
  date: string;
  isFutureLoading: boolean;
}

const Header = (props: Props): ReactElement => {
  const { t } = useTranslation();
  return (
    <header className={styles.container}>
      <NavLink to="/" className={styles.logo}>
        LOGO
      </NavLink>
      <p className={`${props.isFutureLoading && styles.skeleton}`}>{props.isFutureLoading ? t("loading.loading") : props.date}</p>
      <p className={`${props.isFutureLoading && styles.skeleton}`}>{props.isFutureLoading ? t("loading.loading") : props.city}</p>
      <section className={styles.settings}>
        <ChooseLanguage />
        <ChooseTheme />
      </section>
    </header>
  );
};

export default Header;
