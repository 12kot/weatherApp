import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";
import { initialUser, initialWeather } from "types/initials";
import { appType, searchType, weatherType } from "types/types";

const initialState: appType = {
  userInfo: initialUser,
  weather: {
    currentWeather: initialWeather,
    searchList: [],
  },
  menuActive: false,
};

export const getUserIP = createAsyncThunk<
  {
    userIP: string;
    userCity: string;
    userCountry: string;
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

    dispatch(fetchWeather({ city: data.city }));
    await dispatch(getRegionIdByIp({ ip: data.ip }));
    dispatch(getCitiesNearby());

    return {
      userIP: data.ip,
      userCity: data.city,
      userCountry: data.country,
    };
  } else {
    return rejectWithValue("");
  }
});

export const getRegionIdByIp = createAsyncThunk<number, { ip: string }>(
  "app/getRegionIdByIp",
  async (props, { rejectWithValue }) => {
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
      const data = await response.json();
      return data.region.parentRegions[0].id;
    }

    return rejectWithValue("");
  }
);

export const getCitiesNearby = createAsyncThunk<
  string[],
  void,
  { state: RootState }
>("app/getCitiesNearby", async (props, { rejectWithValue, getState }) => {
  const response = await fetch(
    `https://data-api.oxilor.com/rest/child-regions?parentId=${
      getState().app.userInfo.regionId
    }`,
    {
      mode: "cors",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_OXELOR_GET_CITIES}`,
      },
    }
  );

  if (response.ok) {
    const data: {edges: []} = await response.json();
    return data.edges.map((item: { node: { name: string } }) => item.node.name);
  }

  return rejectWithValue("");
});

export const fetchWeather = createAsyncThunk<
  weatherType,
  { city: string | null },
  { state: RootState }
>("app/fetchWeather", async (props, { getState, rejectWithValue }) => {
  try {
    const city =
      props.city !== null ? props.city : getState().app.userInfo.userCity;

    let response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_KEY}&q=${city}&aqi=yes`
    );

    if (!response.ok) {
      const ip = getState().app.userInfo.userIP;
      response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_KEY}&q=${ip}&aqi=yes`
      );
    }

    if (response.ok) {
      const data: weatherType = await response.json();

      return data;
    } else {
      return rejectWithValue("weather response");
    }
  } catch {
    return rejectWithValue("weather catch");
  }
});

export const searchCity = createAsyncThunk<string[], { search: string }>(
  "app/searchCity",
  async (props, { rejectWithValue }) => {
    const response = await fetch(
      `https://api.weatherapi.com/v1/search.json?key=${process.env.REACT_APP_WEATHER_KEY}&q=${props.search}`
    );

    if (response.ok) {
      const data: searchType[] = await response.json();

      return data.map((item) => item.name);
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
      .addCase(getUserIP.fulfilled, (state, action) => {
        state.userInfo.userIP = action.payload.userIP;
        state.userInfo.userCity = action.payload.userCity;
        state.userInfo.userCountry = action.payload.userCountry;
      })
      .addCase(getUserIP.rejected, (state) => {
        state.userInfo = { ...initialUser };
      })

      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.weather.currentWeather = { ...action.payload };
      })
      .addCase(fetchWeather.rejected, (state) => {
        state.weather.currentWeather = { ...initialWeather };
      })

      .addCase(searchCity.fulfilled, (state, action) => {
        state.weather.searchList = action.payload;
      })
      .addCase(searchCity.rejected, (state) => {
        state.weather.searchList = [];
      })

      .addCase(getRegionIdByIp.fulfilled, (state, action) => {
        state.userInfo.regionId = action.payload;
      })
      .addCase(getRegionIdByIp.rejected, (state) => {
        state.userInfo.regionId = 628035;
      })

      .addCase(getCitiesNearby.fulfilled, (state, action) => {
        state.userInfo.citiesNearby = action.payload;
        state.weather.searchList = action.payload;
      })
      .addCase(getCitiesNearby.rejected, (state) => {
        state.userInfo.regionId = 628035;
      })
      
      ;
  },
});

export const { menuHandler } = appSlice.actions;
export default appSlice;
