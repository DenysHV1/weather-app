import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { ICurrentWeatherResponse, WeatherApiResponse } from "./types";

const apiKey = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.weatherapi.com/v1";

export const getWetherByCity = createAsyncThunk<ICurrentWeatherResponse, string, { rejectValue: string }>("wether/getWetherByCity", async (city, thunkAPI) => {
    try {
      const response = await axios.get<WeatherApiResponse>(
        `${BASE_URL}/forecast.json`,
        {
          params: {
            key: apiKey,
            q: city,
            days: 7,
            lang: "en",
          },
        }
      );

      const data: ICurrentWeatherResponse = {
        current: response.data.current,
        today: response.data.forecast.forecastday[0].hour,
        future: response.data.forecast.forecastday,
        location: response.data.location,
      };

      return data;

    } catch (e: unknown) {
      const message =
        e instanceof Error ? e.message : "Request failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getWeatherByPosition = createAsyncThunk<ICurrentWeatherResponse,string,{ rejectValue: string }>(
  "weather/getWeatherByPosition",
  async (position, thunkAPI) => {
    try {
      const response = await axios.get<WeatherApiResponse>(
        `${BASE_URL}/forecast.json`,
        {
          params: {
            key: apiKey,
            q: position,
            days: 7,
            lang: "en"
          }
        }
      );

      const data: ICurrentWeatherResponse = {
        current: response.data.current,
        today: response.data.forecast.forecastday[0].hour,
        future: response.data.forecast.forecastday,
        location: response.data.location,
      };

      return data;

    } catch (e: unknown) {
      const message =
        e instanceof Error ? e.message : "Request failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);