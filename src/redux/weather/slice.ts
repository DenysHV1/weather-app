import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getWeatherByPosition, getWetherByCity } from "./thunks";
import type { ICurrentWeatherResponse, IState, TemperatureUnit } from "./types";

const initialState: IState = {
  isLoading: false,
  isError: false,
  location: null,
  current: null,
  day: [],
  future: [],

  tempUnit: "C",
};

const handleError = (state: IState) => {
  state.isLoading = false;
  state.isError = true;
};

const handlePending = (state: IState) => {
  state.isLoading = true;
  state.isError = false;
  state.location = null;
  state.current = null;
  state.day = [];
  state.future = [];
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
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setTempUnit(state: IState, {payload}: PayloadAction<TemperatureUnit>) {
      state.tempUnit = payload;
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
export const { setTempUnit } = weatherSlice.actions;
