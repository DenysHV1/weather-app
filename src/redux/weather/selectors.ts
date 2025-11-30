import type { RootState } from "../store"; 
import type { ICityListItem, IFuture, ILocation, IWeatherObj, TemperatureUnit } from "./types";

export const selectIsLoading = (state: { weather: { isLoading: boolean } }) => state.weather.isLoading;
export const selectIsError = (state: { weather: { isError: string } }) => state.weather.isError;

export const selectLocation = (state: { weather: { location: ILocation } }) => state.weather.location;
export const selectCurrent = (state: { weather: { current: IWeatherObj } }) => state.weather.current;
export const selectDay = (state: { weather: { day: IWeatherObj[] } }) => state.weather.day;
export const selectFuture = (state: RootState): IFuture[] =>
  state.weather.future;

export const selectTempUnit = (state: { weather: { tempUnit: TemperatureUnit } }) => state.weather.tempUnit;

export const selectCityList = (state: { weather: { cityList: ICityListItem[] } }) => state.weather.cityList;