import { useEffect } from "react";
import { Container } from "./components/container/Container";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "./redux/store";
import { getWeatherByPosition } from "./redux/weather/thunks";
import { useGeolocation } from "./hooks/useGeolocation";
import MainWidget from "./components/MainWidget/MainnWidget";
import SearchWeather from "./components/SearchWeather/SearchWeather";
import CityHistory from "./components/CityHistory/CityHistory";
import ErrorComponent from "./components/ErrorComponent/ErrorComponent";
import { selectCurrent } from "./redux/weather/selectors";

function App() {
  const { position, error, getLocation } = useGeolocation();
  const dispatch = useDispatch<AppDispatch>();
  const current = useSelector(selectCurrent);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  useEffect(() => {
    if (!position) return;
    dispatch(
      getWeatherByPosition(`${position.latitude},${position.longitude}`)
    );
  }, [position, dispatch]);

  if (error || !current) {
    return (
      <Container>
        <SearchWeather />
        <main className="main">
          <ErrorComponent />
          <CityHistory />
        </main>
        {error && <div className="geo-error">{error}</div>}
      </Container>
    );
  }

  return (
    <Container>
      <SearchWeather />
      <main className="main">
        <MainWidget />
        <CityHistory />
      </main>
      {error && <div className="geo-error">{error}</div>}
    </Container>
  );
}

export default App;
