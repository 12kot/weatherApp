import React, { ReactElement, useState, useEffect } from "react";
import styles from "./header.module.scss";
import { useTranslation } from "react-i18next";
import Select from "ui/select/select";

import MoonSVG from "ui/svg/moon";
import SunSVG from "ui/svg/sun";
import SystemSVG from "ui/svg/system";
import LngSVG from "ui/svg/lng";

import { themeType } from "types/types";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { menuHandler } from "store/slices/appSlice";
import MenuSVG from "ui/svg/menu";

const Header = (): ReactElement => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const menuActive = useAppSelector((state) => state.app.menuActive);

  const [head, setHead] = useState<boolean>(false);
  const [menu, setMenu] = useState<boolean>(window.innerWidth < 1170);
  const [theme, setTheme] = useState<themeType>(
    (localStorage.getItem("theme") as themeType) || "system"
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

  useEffect(() => {
    window.addEventListener("scroll", function () {
      if (window.scrollY >= 65 && !menuActive) setHead(true);
      else setHead(false);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth < 1170) setMenu(true);
      else {
        document.body.removeAttribute("no_scroll");
        setMenu(false)
      };
    });
  }, [menuActive]);

  const handleMenu = () => {
    if (!menuActive) setHead(false);
    else if (window.scrollY >= 65) setHead(true);

    if (!menuActive) document.body.setAttribute("no_scroll", "");
    else document.body.removeAttribute("no_scroll");

    dispatch(menuHandler(!menuActive));
  };

  return (
    <header className={`${styles.container} ${head && styles.active} ${menuActive && styles.m_active}`}>
      <p className={styles.logo}>LOGO</p>
      {!menuActive && (
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
      )}

      {(head || menu) && !menuActive && (
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
      )}

      {menu && (
        <span
          className={`${styles.menu}`}
          onClick={handleMenu}
        >
          <MenuSVG />
        </span>
      )}
    </header>
  );
};

export default Header;
