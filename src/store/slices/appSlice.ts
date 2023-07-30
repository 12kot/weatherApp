import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";
import {
  initialFutureWeather,
  initialUser,
  initialWeather,
} from "types/initials";
import {
  appType,
  cityType,
  futureWeatherType,
  searchType,
  weatherType,
} from "types/types";

const initialState: appType = {
  userInfo: initialUser,
  weather: {
    isWeatherLoading: false,
    currentWeather: initialWeather,
    search: {
      searchList: [],
      isSearchLoading: false,
    },
    futureWeather: {
      futureWeather: initialFutureWeather,
      isFutureLoading: false,
    },
  },
  menuActive: false,
  isAppLoading: false,
};

export const getUserIP = createAsyncThunk<
  {
    userIP: string;
    userCity: string;
    userCountry: string;
    location: string;
  },
  void,
  { state: RootState }
>("app/getUserIP", async (_, { rejectWithValue, dispatch }) => {
  const response = await fetch(
    `https://ipinfo.io/json?token=${process.env.REACT_APP_GET_USER_CITY_BY_IP_IPINFO}`,
    {
      mode: "cors",
    }
  );

  if (response.ok) {
    const data = await response.json();

    //dispatch(fetchWeather({ info: data.loc }));
    dispatch(getCitiesNearby({ ip: data.ip }));

    return {
      userIP: data.ip,
      userCity: data.city,
      userCountry: data.country,
      location: data.loc,
    };
  } else {
    return rejectWithValue("");
  }
});

const getDivision1 = async (
  props: {
    name: string;
    id: number;
  }[]
): Promise<{ name: string; id: number }> => {
  for (const parent of props) {
    const response = await fetch(
      `https://data-api.oxilor.com/rest/region?id=${parent.id}`,
      {
        mode: "cors",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_OXELOR_GET_CITIES}`,
        },
      }
    );

    if (response.ok) {
      const data: { type: string; name: string; id: number } =
        await response.json();

      if (data.type === "division1") return { name: data.name, id: data.id };
    }
  }

  return props[0];
};

const getRegionIdByIp = async (props: {
  ip: string;
}): Promise<{ name: string; id: number }> => {
  const response = await fetch(
    `https://data-api.oxilor.com/rest/network?ip=${props.ip}`,
    {
      mode: "cors",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_OXELOR_GET_CITIES}`,
      },
    }
  );

  if (response.ok) {
    const data: {
      region: {
        type: string;
        name: string;
        id: number;
        parentRegions: { name: string; id: number }[];
      };
    } = await response.json();

    return await getDivision1(data.region.parentRegions);
  }

  return { name: "Grodno", id: 627904 };
};

export const getCitiesNearby = createAsyncThunk<
  cityType[],
  { ip: string },
  { state: RootState }
>("app/getCitiesNearby", async (props, { rejectWithValue }) => {
  const region = await getRegionIdByIp({ ip: props.ip });

  const response = await fetch(
    `https://data-api.oxilor.com/rest/child-regions?parentId=${region.id}&first=100`,
    {
      mode: "cors",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_OXELOR_GET_CITIES}`,
      },
    }
  );

  if (response.ok) {
    const data: { edges: [] } = await response.json();

    return data.edges.map(
      (item: {
        node: {
          name: string;
          latitude: number;
          longitude: number;
          parentRegions: { id: number; name: string }[];
        };
      }) => {
        return {
          name: item.node.name,
          region: item.node.parentRegions[0]?.name || "",
          coords: {
            latitude: item.node.latitude,
            longitude: item.node.longitude,
          },
        };
      }
    );
  }

  return rejectWithValue("");
});

export const fetchWeather = createAsyncThunk<
  weatherType,
  { info: string },
  { state: RootState }
>("app/fetchWeather", async (props, { getState, rejectWithValue }) => {
  let response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${
      process.env.REACT_APP_WEATHER_KEY
    }&q=${props.info}&lang=${localStorage.getItem("i18nextLng")}&aqi=yes`
  );

  if (!response.ok) {
    console.log("Не нашли такой город");

    const loc = getState().app.userInfo.location;
    response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_KEY}&q=${loc}&aqi=yes`
    );

    return rejectWithValue("weather response");
  }
  if (response.ok) {
    const data: weatherType = await response.json();

    return data;
  }

  return rejectWithValue("weather response");
});

export const fetchFutureWeather = createAsyncThunk<
  futureWeatherType,
  { info: string },
  { state: RootState }
>("app/fetchFutureWeather", async (props, { getState, rejectWithValue }) => {
  const days = 10;
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${
      process.env.REACT_APP_WEATHER_KEY
    }&q=${props.info}&lang=${localStorage.getItem(
      "i18nextLng"
    )}&days=${days}&aqi=no&alerts=no`
  );

  if (response.ok) {
    const data: futureWeatherType = await response.json();

    console.log(data);
    return data;
  }

  return rejectWithValue("weather response");
});

export const searchCity = createAsyncThunk<cityType[], { search: string }>(
  "app/searchCity",
  async (props, { rejectWithValue }) => {
    const response = await fetch(
      `https://api.weatherapi.com/v1/search.json?key=${
        process.env.REACT_APP_WEATHER_KEY
      }&q=${props.search}&lang=${localStorage.getItem("i18nextLng")}`
    );

    if (response.ok) {
      const data: searchType[] = await response.json();

      return data.map(
        (item: { name: string; region: string; lat: number; lon: number }) => {
          return {
            name: item.name,
            region: item.region,
            coords: {
              latitude: item.lat,
              longitude: item.lon,
            },
          };
        }
      );
    } else return rejectWithValue("");
  }
);

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    menuHandler(state, action: PayloadAction<boolean>) {
      state.menuActive = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserIP.pending, (state, action) => {
        state.isAppLoading = true;
      })
      .addCase(getUserIP.fulfilled, (state, action) => {
        state.userInfo.userIP = action.payload.userIP;
        state.userInfo.userCity = action.payload.userCity;
        state.userInfo.userCountry = action.payload.userCountry;
        state.userInfo.location = action.payload.location;

        state.isAppLoading = false;
      })
      .addCase(getUserIP.rejected, (state) => {
        state.userInfo = { ...initialUser };
        state.isAppLoading = false;
      })

      .addCase(fetchWeather.pending, (state, action) => {
        state.weather.isWeatherLoading = true;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.weather.currentWeather = { ...action.payload };
        state.weather.isWeatherLoading = false;
      })
      .addCase(fetchWeather.rejected, (state) => {
        state.weather.isWeatherLoading = false;
        //state.weather.currentWeather = { ...initialWeather };
      })

      .addCase(fetchFutureWeather.pending, (state, action) => { 
        state.weather.futureWeather.isFutureLoading = true;
      })
      .addCase(fetchFutureWeather.fulfilled, (state, action) => {
        state.weather.futureWeather.futureWeather = { ...action.payload };
        state.weather.futureWeather.isFutureLoading = false;
      })
      .addCase(fetchFutureWeather.rejected, (state) => {
        state.weather.futureWeather.isFutureLoading = false;
        //state.weather.currentWeather = { ...initialWeather };
      })

      .addCase(searchCity.pending, (state) => {
        state.weather.search.isSearchLoading = true;
      })
      .addCase(searchCity.fulfilled, (state, action) => {
        state.weather.search.searchList = action.payload;

        state.weather.search.isSearchLoading = false;
      })
      .addCase(searchCity.rejected, (state) => {
        state.weather.search.searchList = [];
        state.weather.search.isSearchLoading = false;
      })

      .addCase(getCitiesNearby.pending, (state, action) => {
        state.userInfo.citiesNearby.isNearbyLoading = true;
      })
      .addCase(getCitiesNearby.fulfilled, (state, action) => {
        state.userInfo.citiesNearby.citiesNearby = action.payload;
        //state.weather.searchList = action.payload;
        state.userInfo.citiesNearby.isNearbyLoading = false;
      })
      .addCase(getCitiesNearby.rejected, (state) => {
        state.userInfo.regionId = 628035;
        state.userInfo.citiesNearby.isNearbyLoading = false;
      });
  },
});

export const { menuHandler } = appSlice.actions;
export default appSlice;
