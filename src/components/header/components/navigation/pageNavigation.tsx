import React, { ReactElement } from "react";
import styles from "./pageNavigation.module.scss";
import { useTranslation } from "react-i18next";

const PageNavigation = (props: {headActive?: boolean}): ReactElement => {
  const { t } = useTranslation();

  return (
    <nav className={`${styles.page} ${props.headActive && styles.active}`}>
      <a href="#currentDay" className={styles.item}>
        {t("header.weather")}
      </a>
      <a href="#search" className={styles.item}>
        {t("header.search")}
      </a>
      <a href="#about" className={styles.item}>
        {t("header.about")}
      </a>
    </nav>
  );
};

export default PageNavigation;
