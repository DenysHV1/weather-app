import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getWeatherByPosition, getWetherByCity } from "./thunks";
import type { ICurrentWeatherResponse, IState } from "./types";

const initialState: IState = {
  isLoading: false,
  isError: false,
  location: null,
  current: null,
  today: [],
  future: [],
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
  state.today = [];
  state.future = [];
};

const handleFulfilled = (
  state: IState,
  { payload }: PayloadAction<ICurrentWeatherResponse>
) => {
  state.isLoading = false;
  state.location = payload.location;
  state.current = payload.current;
  state.today = payload.today;
  state.future = payload.future;
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
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
// export const {  } = weatherSlice.actions;
