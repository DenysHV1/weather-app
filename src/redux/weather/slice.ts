import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getWeatherByPosition, getWetherByCity } from "./thunks";
import type { ICurrentWeatherResponse, IState, TemperatureUnit } from "./types";

//!---------------------------
const initialState: IState = {
  isLoading: false,
  isError: "",
  location: null,
  current: null,
  day: [],
  future: [],
  tempUnit: "C",
  cityList: [],
};
//!---------------------------

const handlePending = (state: IState) => {
  state.isLoading = true;
  state.isError = "";
  state.location = null;
  state.current = null;
  state.day = [];
  state.future = [];
};

const handleError = (
  state: IState,
  { payload }: PayloadAction<string | undefined>
) => {
  state.isLoading = false;
  state.isError = payload ?? "Unknown error";
};

const handleFulfilled = (
  state: IState,
  { payload }: PayloadAction<ICurrentWeatherResponse>
) => {
  state.isLoading = false;
  state.location = payload.location;
  state.current = payload.current;
  state.day = payload.day;

  state.future = payload.future;
  if (payload.cityResult) {
    const exists = state.cityList.some(
      ({ name }) =>
        name.toLowerCase() === payload.cityResult?.name.toLowerCase()
    );

    state.cityList = exists
      ? state.cityList
      : [payload.cityResult, ...state.cityList];
  }
};

//!---------------------------

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setTempUnit(state: IState, { payload }: PayloadAction<TemperatureUnit>) {
      state.tempUnit = payload;
    },
    setFutureData(state: IState, { payload }: PayloadAction<number>) {
      state.day = state.future[payload].hour;
    },
    deleteListItem(state: IState, { payload }: PayloadAction<string>) {
      state.cityList = state.cityList.filter(({ id }) => id !== payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWetherByCity.pending, handlePending)
      .addCase(getWetherByCity.rejected, handleError)
      .addCase(getWetherByCity.fulfilled, handleFulfilled)

      .addCase(getWeatherByPosition.pending, handlePending)
      .addCase(getWeatherByPosition.rejected, handleError)
      .addCase(getWeatherByPosition.fulfilled, handleFulfilled);
  },
});

export const weatherReducer = weatherSlice.reducer;
export const { setTempUnit, setFutureData, deleteListItem } =
  weatherSlice.actions;
