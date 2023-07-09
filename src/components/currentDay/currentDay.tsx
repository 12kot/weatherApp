import React, { ReactElement } from "react";
import styles from "./currentDay.module.scss";

import Input from "ui/input/input";
import SearchSVG from "ui/svg/search";
import Information from "./information/information";
import { useTranslation } from "react-i18next";

const CurrentDay = (): ReactElement => {
  const { t } = useTranslation();

  const getDay = (day: number): string => {
    switch (day) {
      case 1:
        return t("days.monday");
      case 2:
        return t("days.tuesday");
      case 3:
        return t("days.wednesday");
      case 4:
        return t("days.thursday");
      case 5:
        return t("days.friday");
      case 6:
        return t("days.saturday");
      case 0:
        return t("days.sunday");
      default:
        return "";
    }
  };

  const getDate = (time: string): string => {
    const strTime = time.split(" ");
    let newTime = strTime.join("T");

    if (strTime[1]?.length === 4)
      newTime = `${strTime[0]}T0${strTime[1]}`
    
    const date = new Date(newTime);
    
    const [hours, minutes, day, month, year] = [
      date.getHours() < 10 ? `0${date.getHours()}` : date.getHours(),
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes(),
      date.getDate(),
      t(`months.${date.toLocaleString("en", { month: "short" })}`),
      date.getFullYear().toString().slice(2),
    ];

    return `${hours}:${minutes} - ${getDay(
      date.getDay()
    )}, ${day} ${month} '${year}`;
  };

  return (
    <div className={styles.container} id="currentDay">
      <Information getDate={getDate} />

      <div className={styles.menu}>
        <div className={styles.search}>
          <div className={styles.search_btn}>
            <SearchSVG />
          </div>
          <span className={styles.inp}>
            <Input color={styles.color} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default CurrentDay;
