import React from "react";
import styles from "./notFound.module.scss";
import SunColorSVG from "ui/colorSVG/sunColor";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <main className={styles.container}>
      <article className={styles.content}>
        <section className={styles.notFound}>
          <p>4</p>
          <span className={styles.img}>
            <SunColorSVG animated={true} />
          </span>
          <p>4</p>
        </section>
        <section className={styles.actions}>
          <p>{t("notFound.title")} </p>
          <span className={styles.buttons}>
            <NavLink to="/" className={styles.button}>{t("notFound.backToHome")}</NavLink>

          </span>
        </section>
      </article>
    </main>
  );
};

export default NotFound;
