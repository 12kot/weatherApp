import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";
import { initialUser, initialWeather } from "types/initials";
import { weatherType } from "types/types";

interface appType {
  userInfo: {
    userIP: string;
    userCity: string;
    userCountry: string;
  };
  weather: weatherType;
}

const initialState: appType = {
  userInfo: {
    userIP: "",
    userCity: "",
    userCountry: "",
  },
  weather: initialWeather,
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

    return { userIP: data.ip, userCity: data.city, userCountry: data.country };
  } else return rejectWithValue("");
});

export const fetchWeather = createAsyncThunk<
  weatherType,
  { city: string | null },
  { state: RootState }
>("app/fetchWeather", async (props, { getState, rejectWithValue }) => {
  const city =
    props.city !== null ? props.city : getState().app.userInfo.userCity;

  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_KEY}&q=${city}&aqi=yes`
  );

  if (response.ok) {
    const data: weatherType = await response.json();

    return data;
  } else return rejectWithValue("");
});

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserIP.fulfilled, (state, action) => {
        state.userInfo = { ...action.payload };
      })
      .addCase(getUserIP.rejected, (state) => {
        state.userInfo = { ...initialUser };
      })

      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.weather = { ...action.payload };
      })
      .addCase(fetchWeather.rejected, (state) => {
        state.weather = { ...initialWeather };
      });
  },
});

export default appSlice;
