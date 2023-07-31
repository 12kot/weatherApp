import React, { ReactElement } from "react";
import styles from "./input.module.scss";
import { useTranslation } from "react-i18next";

interface Props {
  color: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  handleClick: (info: string) => void;
}

const Input = (props: Props): ReactElement => {
  const { t } = useTranslation();

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.code === "Enter") {
      props.handleClick(props.value);
    }
  };

  return (
    <div>
      <input
        className={`${styles.input_box} ${props.color}`}
        type="text"
        placeholder={t("menu.another_location")}
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
        onKeyDown={(e) => onKeyDown(e)}
      />
    </div>
  );
};

export default Input;
