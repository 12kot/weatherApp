import { ReactElement, memo } from "react";
import { cityType } from "types/types";
import CityItem from "./cityItem/cityItem";
import { v4 } from "uuid";
import Marquee from "react-fast-marquee";
import styles from "./citiesMarquee.module.scss";

interface Props {
  cities: cityType[];
  rows: number;
  size: number;
  speed: number;
  isNearbyLoading: boolean;
}

const CitiesMarquee = memo((props: Props): ReactElement => {
  const getSkeletonMarquee = () => {
    return [...Array(props.size)].map(() => (
      <div className={`${styles.item} ${styles.skeleton}`} key={v4()}></div>
    ));
  };

  const getRandomMarqueeItems = (): ReactElement[] => {
    const elements: cityType[] = [];

    if (props.cities.length !== 0)
      for (let i = 0; i < props.size; i++) {
        const randValue = Math.floor(Math.random() * props.cities.length);
        elements.push(props.cities[randValue]);
      }

    return elements.map((city) => <CityItem city={city} key={v4()} />);
  };

  const getMarquees = (): ReactElement[] => {
    const marquues: ReactElement[] = [];

    for (let i = 0; i < props.rows; i++) {
      marquues.push(
        <Marquee
          direction={!(i % 2) ? "right" : "left"}
          pauseOnHover
          speed={!(i % 2) ? props.speed * 2 : props.speed}
          key={v4()}
        >
          <span className={styles.carousel_item}>
            {props.isNearbyLoading ? getSkeletonMarquee() : getRandomMarqueeItems()}
          </span>
        </Marquee>
      );
    }

    return marquues;
  };

  return <section className={styles.carousel}>{getMarquees()}</section>;
});

export default CitiesMarquee;
