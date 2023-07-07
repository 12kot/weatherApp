import React, { ReactElement, useState, useEffect } from "react";
import styles from "./header.module.scss";
import { useTranslation } from "react-i18next";
import Select from "ui/select/select";

import MoonSVG from "ui/select/svg/moon";
import SunSVG from "ui/select/svg/sun";
import SystemSVG from "ui/select/svg/system";
import LngSVG from "ui/select/svg/lng";

import { themeType } from "types/types";

const Header = (): ReactElement => {
  const { t, i18n } = useTranslation();
  const [head, setHead] = useState<boolean>(false);
  const [theme, setTheme] = useState<themeType>(
    localStorage.getItem("theme") as themeType || "system"
  );
  const [lng, setLng] = useState<string>(
    localStorage.getItem("i18nextLng") as "en" | "ru" | "default"
  );

  useEffect(() => {
    if (lng === "default") i18n.changeLanguage(navigator.language);
    else i18n.changeLanguage(lng);
  }, [lng, i18n]);

  useEffect(() => {
    if (theme === "dark") document.body.setAttribute("dark", "");
    else if (theme === "light") document.body.removeAttribute("dark");
    else {
      const darkModeMediaQuery = window.matchMedia(
        "(prefers-color-scheme: dark)"
      );
      if (darkModeMediaQuery.matches) document.body.setAttribute("dark", "");
      else document.body.removeAttribute("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  window.addEventListener("scroll", function () {
    if (window.scrollY >= 65) setHead(true);
    else setHead(false);
  });

  return (
    <header className={`${styles.container} ${head && styles.active}`}>
      <p className={styles.logo}>LOGO</p>
      <span className={styles.page}>
        <a href="#currentDay" className={styles.item}>
          {t("header.weather")}
        </a>
        <a href="#search" className={styles.item}>
          {t("header.search")}
        </a>
        <a href="#about" className={styles.item}>
          {t("header.about")}
        </a>
      </span>

      <span className={styles.choose}>
        <Select
          id="lng"
          name={t("header.lng")}
          inputs={[
            { id: "default", svg: LngSVG, text: t("header.default_lng") },
            { id: "ru", svg: LngSVG, text: "Русский" },
            { id: "en", svg: LngSVG, text: "English" },
          ]}
          value={lng}
          setValue={setLng}
        />

        <Select
          id="theme"
          name={t("header.choose_theme")}
          inputs={[
            { id: "system", svg: SystemSVG, text: t("header.default_theme") },
            { id: "dark", svg: MoonSVG, text: t("header.dark_theme") },
            { id: "light", svg: SunSVG, text: t("header.light_theme") },
          ]}
          value={theme}
          setValue={setTheme}
        />
      </span>
    </header>
  );
};

export default Header;
