import React, { ReactElement } from "react";
import { useParams } from "react-router-dom";
import styles from "./location.module.scss";
import Header from "./header/header";

const Location = (): ReactElement => {
  const { location } = useParams<string>();

  return (
    <div className={styles.container}>
      <Header />
      {location}
    </div>
  );
};

export default Location;
