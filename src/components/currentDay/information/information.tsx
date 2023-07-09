import React, { ReactElement } from "react";
import SunColorSVG from "ui/colorSVG/sunColor";
import { useAppSelector } from "hooks/hooks";
import styles from "./information.module.scss";

const Information = (props: {
  getDate: (time: string) => string;
}): ReactElement => {
  const { name, localtime } = useAppSelector(
    (state) => state.app.weather.location
  );
  const { temp_c } = useAppSelector((state) => state.app.weather.current);
  const { text } = useAppSelector(
    (state) => state.app.weather.current.condition
  );

  return (
    <div className={styles.information}>
      <p className={styles.celsius}>{temp_c}</p>
      <div className={styles.block_info}>
        <div className={styles.first}>
          <p>{name}</p>
          <p className={styles.block_item}>{props.getDate(localtime)}</p>
        </div>
        <div className={styles.second}>
          <span className={styles.img}>
            <SunColorSVG />
          </span>
          <p className={styles.block_item}>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Information;
