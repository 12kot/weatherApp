import React, { ReactElement, useState, useEffect } from "react";
import styles from "./header.module.scss";

import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { menuHandler } from "store/slices/appSlice";
import MenuSVG from "ui/svg/menu";
import ChooseLanguage from "components/header/components/chooseLanguage";
import ChooseTheme from "components/header/components/chooseTheme";
import PageNavigation from "./components/navigation/pageNavigation";

const Header = (): ReactElement => {
  const dispatch = useAppDispatch();
  const menuActive = useAppSelector((state) => state.app.menuActive);

  const [head, setHead] = useState<boolean>(false);
  const [menu, setMenu] = useState<boolean>(window.innerWidth < 1170);

  useEffect(() => {
    window.addEventListener("scroll", function () {
      if (window.scrollY >= 65 && !menuActive) setHead(true);
      else setHead(false);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth < 1170) setMenu(true);
      else {
        document.body.removeAttribute("no_scroll");
        setMenu(false);
      }
    });
  }, [menuActive]);

  const handleMenu = () => {
    if (!menuActive) setHead(false);
    else if (window.scrollY >= 65) setHead(true);

    if (!menuActive) document.body.setAttribute("no_scroll", "");
    else document.body.removeAttribute("no_scroll");

    dispatch(menuHandler(!menuActive));
  };

  return (
    <header
      className={`${styles.container} ${head && styles.active} ${
        menuActive && styles.m_active
      }`}
    >
      <p className={styles.logo}>LOGO</p>

      {!menuActive && <PageNavigation headActive={head} />}

      {(head || menu) && !menuActive && (
        <span className={styles.settings}>
          <ChooseLanguage />
          <ChooseTheme />
        </span>
      )}

      {menu && (
        <span className={`${styles.menu}`} onClick={handleMenu}>
          <MenuSVG />
        </span>
      )}
    </header>
  );
};

export default Header;
