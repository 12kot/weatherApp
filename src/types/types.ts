export type themeType = "dark" | "system" | "light";

export interface appType {
  userInfo: userInfoType;
  weather: {
    isWeatherLoading: boolean;
    currentWeather: weatherType;
    search: {
      searchList: cityType[];
      isSearchLoading: boolean;
    };
    futureWeather: {
      futureWeather: futureWeatherType;
      isFutureLoading: boolean;
      isError: boolean;
    };
  };
  menuActive: boolean;
  isAppLoading: boolean;
}

export interface cityType {
  name: string;
  region: string;
  coords: {
    latitude: number;
    longitude: number;
  };
}

export interface userInfoType {
  userIP: string;
  userCity: string;
  userCountry: string;
  location: string;
  regionId: number;
  citiesNearby: {
    citiesNearby: cityType[];
    isNearbyLoading: boolean;
  };
}

export interface weatherType {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  current: {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: conditionType;
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
    air_quality: {
      co: number;
      no2: number;
      o3: number;
      so2: number;
      pm2_5: number;
      pm10: number;
    };
  };
}

export interface futureWeatherType extends weatherType {
  forecast: {
    forecastday: futureDay[];
  };
}

export interface futureDay {
  date: string;
  day: futureDayInfoType;

  hour: hourItemType[];
}

export interface futureDayInfoType {
  avgtemp_c: number;
  condition: conditionType;
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
  avgtemp_f: number;
  maxwind_mph: number;
  maxwind_kph: number;
  totalprecip_mm: number;
  totalprecip_in: number;
  totalsnow_cm: number;
  avgvis_km: number;
  avgvis_miles: number;
  avghumidity: number;
  daily_will_it_rain: number;
  daily_chance_of_rain: number;
  daily_will_it_snow: number;
  daily_chance_of_snow: number;
  astro: astroType;
}

export interface astroType {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: string;
  moon_illumination: number;
  is_moon_up: number;
  is_sun_up: number;
}

export interface hourItemType {
  time: string;
  temp_c: number;
  condition: conditionType;
}

interface conditionType {
  text: string;
  icon: string;
  code: number;
}

export interface searchType {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}
