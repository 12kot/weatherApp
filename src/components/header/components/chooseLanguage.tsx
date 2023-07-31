import { useAppDispatch, useAppSelector } from "hooks/hooks";
import React, { useState, ReactElement, useEffect } from "react";
import { fetchWeather } from "store/slices/appSlice";

import { useTranslation } from "react-i18next";
import Select from "ui/select/select";
import LngSVG from "ui/svg/lng";

const ChooseLanguage = (): ReactElement => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const { lat, lon } = useAppSelector(
    (state) => state.app.weather.currentWeather.location
  );

  const [lng, setLng] = useState<string>(
    localStorage.getItem("i18nextLng") as "en" | "ru" | "by" | "default"
  );

  useEffect(() => {
    if (i18n.language === lng) return;

    if (lng === "default") i18n.changeLanguage(navigator.language);
    else i18n.changeLanguage(lng);

    dispatch(fetchWeather({ info: lat + "," + lon }));
  }, [lng, i18n, dispatch]);

  return (
    <Select
      id="lng"
      name={t("header.lng")}
      inputs={[
        { id: "default", svg: LngSVG, text: t("header.default_lng") },
        { id: "ru", svg: LngSVG, text: "Русский" },
        { id: "en", svg: LngSVG, text: "English" },
        { id: "by", svg: LngSVG, text: "Беларуская" },
      ]}
      value={lng}
      setValue={setLng}
    />
  );
};

export default ChooseLanguage;
