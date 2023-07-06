import React, {useEffect} from 'react';
import './App.css';
import { useTranslation } from "react-i18next";

const App = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (!localStorage.getItem("i18nextLng"))
      i18n.changeLanguage(navigator.language);
  }, [])

  const ch = (str: string) => {
    i18n.changeLanguage(str);
  }

  return (
    <div>
      {t("header")}
      <button onClick={() => ch("ru")}>RU</button>
      <button onClick={() => ch("en")}>EN</button>
    </div>
  );
}

export default App;
