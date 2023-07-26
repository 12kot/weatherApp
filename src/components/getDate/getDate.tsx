import { useTranslation } from "react-i18next";

const GetDate = (props: { time: string }) => {
  const { t } = useTranslation();
  const strTime = props.time.split(" ");
  let newTime = strTime.join("T");

  if (strTime[1]?.length === 4) newTime = `${strTime[0]}T0${strTime[1]}`;

  const date = new Date(newTime);

  const [hours, minutes, day, month, year] = [
    date.getHours() < 10 ? `0${date.getHours()}` : date.getHours(),
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes(),
    date.getDate(),
    t(`months.${date.toLocaleString("en", { month: "short" })}`),
    date.getFullYear().toString(),
  ];

  const getDay = (): string => {
    switch (date.getDay()) {
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

    const getTime = () => `${hours}:${minutes}`;
    const getFullDate = () => date.toLocaleDateString('en-US').replaceAll("/", ".");

  const getDate = (): string => {
    return `${hours}:${minutes} - ${getDay()}, ${day} ${month} '${year.slice(2)}`;
  };

  return { getTime, getDay, getFullDate, getDate };
};

export default GetDate;
