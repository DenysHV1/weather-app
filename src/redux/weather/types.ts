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

export interface IFutureDay {
  date?: string;
  maxtemp_c?: number;
  maxtemp_f?: number;
  mintemp_c?: number;
  mintemp_f?: number;
  condition?: {
    icon?: string;
  };
}

export interface IFuture {
  date: string;
  date_epoch?: number;
  hour: IWeatherObj[];
  day?: IFutureDay | null;
}

export interface ICityListItem {
  id: string;
  name: string;
}

//то что возвращает апи
export interface WeatherApiResponse {
  location: ILocation;
  current: IWeatherObj;
  forecast: {
    forecastday: IDay[];
  };
}

// результат после преобразования
export interface ICurrentWeatherResponse {
  current: IWeatherObj;
  day: IWeatherObj[];
  future: IFuture[];
  location: ILocation;
  cityResult?: ICityListItem;
}


// стейт
export interface IState {
  isLoading: boolean;
  isError: string;
  current: IWeatherObj | null;
  day: IWeatherObj[] | null;
  future: IFuture[] | [];
  location: ILocation | null;
  tempUnit: TemperatureUnit;
  cityList: ICityListItem[];
}


export const TemperatureUnit = {
  C: "C",
  F: "F",
} as const;
export type TemperatureUnit = typeof TemperatureUnit[keyof typeof TemperatureUnit];