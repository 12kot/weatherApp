import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";
import { initialUser, initialWeather } from "types/initials";
import { appType, cityType, searchType, weatherType } from "types/types";

const initialState: appType = {
  userInfo: initialUser,
  weather: {
    isLoading: false,
    currentWeather: initialWeather,
    searchList: [],
    searchError: false,
  },
  menuActive: false,
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
      const data: {type: string, name: string, id: number} = await response.json();

      if (data.type === "division1")
        return { name: data.name, id: data.id };
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
      .addCase(getUserIP.fulfilled, (state, action) => {
        state.userInfo.userIP = action.payload.userIP;
        state.userInfo.userCity = action.payload.userCity;
        state.userInfo.userCountry = action.payload.userCountry;
        state.userInfo.location = action.payload.location;
      })
      .addCase(getUserIP.rejected, (state) => {
        state.userInfo = { ...initialUser };
      })

      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.weather.currentWeather = { ...action.payload };
      })
      .addCase(fetchWeather.rejected, (state) => {
        //state.weather.currentWeather = { ...initialWeather };
      })

      .addCase(searchCity.pending, (state) => {
        state.weather.isLoading = true;
      })
      .addCase(searchCity.fulfilled, (state, action) => {
        state.weather.searchList = action.payload;
        
        if (!action.payload.length) state.weather.searchError = true;
        else state.weather.searchError = false;

        state.weather.isLoading = false;
      })
      .addCase(searchCity.rejected, (state) => {
        state.weather.searchList = [];
        state.weather.isLoading = false;
      })

      .addCase(getCitiesNearby.fulfilled, (state, action) => {
        state.userInfo.citiesNearby = action.payload;
        state.weather.searchList = action.payload;
      })
      .addCase(getCitiesNearby.rejected, (state) => {
        state.userInfo.regionId = 628035;
      });
  },
});

export const { menuHandler } = appSlice.actions;
export default appSlice;
