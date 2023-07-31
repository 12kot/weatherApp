import React, { ReactElement } from "react";
import { useAppSelector } from "hooks/hooks";
import styles from "./information.module.scss";
import GetDate from "hooks/useGetDate";
import { useTranslation } from "react-i18next";

const Information = ({
  isWeatherLoading,
}: {
  isWeatherLoading: boolean;
  }): ReactElement => {
  const { t } = useTranslation();
  const { name, localtime } = useAppSelector(
    (state) => state.app.weather.currentWeather.location
  );
  const { temp_c } = useAppSelector(
    (state) => state.app.weather.currentWeather.current
  );
  const { text, icon } = useAppSelector(
    (state) => state.app.weather.currentWeather.current.condition
  );

  const time = GetDate({ time: localtime });

  return (
    <main className={styles.information}>
      <article className={styles.block_info}>
        <section className={styles.inf}>
          <p
            className={`${styles.celsius} ${
              isWeatherLoading && styles.skeleton
            }`}
          >
            {isWeatherLoading ? t("loading.smile") : temp_c}
          </p>
          <div className={`${styles.first}`}>
            <p className={`${isWeatherLoading && styles.skeleton}`}>{isWeatherLoading ? t("loading.loading") : name}</p>
            <p
              className={`${styles.block_item} ${
                isWeatherLoading && styles.skeleton
              }`}
            >
              {isWeatherLoading ? t("loading.very_soon") : time.getDate()}
            </p>
          </div>
        </section>

        <section className={`${styles.second}`}>
          <img
            src={icon}
            className={`${styles.img} ${isWeatherLoading && styles.skeleton}`}
            alt={text}
          />
          <p
            className={`${styles.block_item} ${
              isWeatherLoading && styles.skeleton
            }`}
          >
            {isWeatherLoading ? t("loading.and_loading") : text}
          </p>
        </section>
      </article>
    </main>
  );
};

export default Information;
