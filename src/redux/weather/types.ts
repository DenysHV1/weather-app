export interface IWeatherObj {
  condition: {
    text: string;
    icon: string;
  };
  temp_c: number;
  temp_f: number;
  feelslike_c: number;
  feelslike_f: number;
  wind_kph: number;
  last_updated: string;
  time?: string;
  time_epoch?: number;
}

interface IDay {
  date: string;
  hour: IWeatherObj[];
}

export interface ILocation {
  country: string;
  name: string;
  region: string;
}

export interface IFuture {
  date: string;
  hour: IWeatherObj[];
}

export interface WeatherApiResponse {
  location: ILocation;
  current: IWeatherObj;
  forecast: {
    forecastday: IDay[];
  };
}

export interface ICurrentWeatherResponse {
  current: IWeatherObj;
  day: IWeatherObj[];
  future: IFuture[];
  location: ILocation;
}

export const TemperatureUnit = {
  C: "C",
  F: "F",
} as const;
export type TemperatureUnit = typeof TemperatureUnit[keyof typeof TemperatureUnit];



export interface IState {
  isLoading: boolean;
  isError: boolean;
  current: IWeatherObj | null;
  day: IWeatherObj[] | null;
  future: IFuture[] | [];
  location: ILocation | null;
  tempUnit: TemperatureUnit;
}
