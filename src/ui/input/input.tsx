import React, { ReactElement } from "react";
import styles from "./input.module.scss";
import { useTranslation } from "react-i18next";

const Input = (props: {color: string}): ReactElement => {
  const { t } = useTranslation();

  return (
    <div>
      <input
        className={`${styles.input_box} ${props.color}`}
        type="text"
        placeholder={t("menu.another_location")}
      />
    </div>
  );
};

export default Input;
