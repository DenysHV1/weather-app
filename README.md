# Weather App
This application allows you to check the weather for your current location or by entering a city name.

## Demo
https://weather-app-nine-gamma-84.vercel.app/

Features

- Powered by weatherapi.com
- Fully responsive UI that adapts to all screen sizes and resolutions
- 7-day detailed weather forecast
- Comprehensive weather data: temperature, wind speed, precipitation, and all weather conditions (rain, snow, cloudy, clear, etc.) — everything is visualized with beautiful icons and conveniently presented on interactive charts/graphs
- Temperature unit switching (Celsius ↔ Fahrenheit)
- Fast and convenient city search
- Current weather by geolocation
- Search history with the ability to delete individual entries

## Tech Stack
- React + Vite
- TypeScript


## State management
- Redux Toolkit
- Redux Persist

## UI / UX
- Swiper
- Recharts
- React Icons
- iZitoast
- Modern normalize

## Data & Utils
- Axios
- UUID
- CLSX

## Environment Variables
- VITE_API_KEY=...

## Project Structure
src/
  components/
    CityHistory/
    CityItem/
    Container/
    DeleteModal/
    ErrorComponent/
    Loader/
    SearchWeather/
    MainWidget/
      CurrentWeather/
      DayWeather/
      FutureWeather/
  hooks/
  redux/
    weather/
  types/
  utils/
