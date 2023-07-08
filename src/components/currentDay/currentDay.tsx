import React, { ReactElement } from "react";
import styles from "./currentDay.module.scss";
import { useAppSelector } from "hooks/hooks";
import { useTranslation } from "react-i18next";
import SunSVG from "ui/select/svg/sun";

const CurrentDay = (): ReactElement => {
  const { t } = useTranslation();
  const { name, localtime } = useAppSelector(
    (state) => state.app.weather.location
  );
  const { temp_c } = useAppSelector((state) => state.app.weather.current);
  const { text } = useAppSelector(
    (state) => state.app.weather.current.condition
  );

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
      case 7:
        return t("days.sunday");
      default:
        return "";
    }
  };

  const getDate = (): string => {
    const date = new Date(localtime);

    return `${date.getHours()}:${
      date.getMinutes() === 0 ? "00" : date.getMinutes()
    } - ${getDay(+date.getDay())}, ${date.getDay()} 
    ${t(`months.${date.toLocaleString("en", { month: "short" })}`)} '${date
      .getFullYear()
      .toString()
      .slice(2)}`;
  };

  return (
    <div className={styles.container} id="currentDay">
      <div className={styles.information}>
        <p className={styles.celsius}>{temp_c}</p>
        <div className={styles.block_info}>
          <div className={styles.first}>
            <p>{name}</p>
            <p className={styles.block_item}>{getDate()}</p>
          </div>
          <div className={styles.second}>
            <span className={styles.img}>
              <SunSVG />
            </span>
            <p className={styles.block_item}>{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentDay;