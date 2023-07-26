import React, { ReactElement, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { themeType } from "types/types";
import Select from "ui/select/select";

import MoonSVG from "ui/svg/moon";
import SunSVG from "ui/svg/sun";
import SystemSVG from "ui/svg/system";

const ChooseTheme = (): ReactElement => {
  const { t } = useTranslation();
  const [theme, setTheme] = useState<themeType>(
    (localStorage.getItem("theme") as themeType) || "system"
  );

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

  return (
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
  );
};

export default ChooseTheme;
