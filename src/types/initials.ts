import { futureWeatherType, userInfoType, weatherType } from "./types";

export const initialUser: userInfoType = {
  userIP: "178.168.186.222",
  userCity: "Hrodna",
  userCountry: "BY",
  location: "53.6884,23.8258",
  regionId: 628035,
  citiesNearby: [],
};

export const initialWeather: weatherType = {
  location: {
    name: "",
    region: "",
    country: "",
    lat: 0,
    lon: 0,
    tz_id: "",
    localtime_epoch: 0,
    localtime: "",
  },
  current: {
    last_updated_epoch: 0,
    last_updated: "",
    temp_c: 0,
    temp_f: 0,
    is_day: 0,
    condition: {
      text: "",
      icon: "",
      code: 0,
    },
    wind_mph: 0,
    wind_kph: 0,
    wind_degree: 0,
    wind_dir: "",
    pressure_mb: 0,
    pressure_in: 0,
    precip_mm: 0,
    precip_in: 0,
    humidity: 0,
    cloud: 0,
    feelslike_c: 0,
    feelslike_f: 0,
    vis_km: 0,
    vis_miles: 0,
    uv: 0,
    gust_mph: 0,
    gust_kph: 0,
    air_quality: {
      co: 0,
      no2: 0,
      o3: 0,
      so2: 0,
      pm2_5: 0,
      pm10: 0,
    },
  },
};

export const initialFutureWeather: futureWeatherType = {
  ...initialWeather,
  forecast: {
    forecastday: [],
  },
};
