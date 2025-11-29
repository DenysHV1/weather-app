interface IWeatherObj {
  condition: {
    text: string;
    icon: string;
  };
  temp_c: number;
  feelslike_c: number;
  wind_kph: number;
  time?: string;
  time_epoch?: number;
}

interface IDay {
  date: string;
  hour: IWeatherObj[];
}

interface ILocation {
  country: string;
  name: string;
  region: string;
}

interface IFuture {
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
  today: IWeatherObj[];
  future: IFuture[];
  location: ILocation;
}

export interface IState {
  isLoading: boolean;
  isError: boolean;
  current: IWeatherObj | null;
  today: IWeatherObj[] | null;
  future: IFuture[] | [];
  location: ILocation | null;
}
