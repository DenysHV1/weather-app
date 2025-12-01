import { useEffect } from "react";
import { Container } from "./components/container/Container";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./redux/store";
import { getWeatherByPosition } from "./redux/weather/thunks";
import { useGeolocation } from "./hooks/useGeolocation";
import MainWidget from "./components/MainWidget/MainnWidget";
import SearchWeather from "./components/SearchWeather/SearchWeather";
import CityHistory from "./components/CityHistory/CityHistory";

function App() {
  const { position, error, getLocation } = useGeolocation();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  useEffect(() => {
    if (!position) return;
    dispatch(
      getWeatherByPosition(`${position.latitude},${position.longitude}`)
    );
  }, [position, dispatch]);

  const retryLocation = () => {
    getLocation();
  };

  return (
    <Container>
      <SearchWeather />
      <main className="main">
        <MainWidget />
        <CityHistory />
      </main>
      {error && <button onClick={retryLocation} className="geo-error-btn">{"Get my weather"}</button>}
    </Container>
  );
}

export default App;
