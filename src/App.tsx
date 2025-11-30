import { useEffect } from "react";
import { Container } from "./components/Container/Container";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./redux/store";
import { getWeatherByPosition } from "./redux/weather/thunks";
import { useGeolocation } from "./hooks/useGeolocation";
import MainWidget from "./components/MainWidget/MainnWidget";
import SearchWeather from "./components/SearchWeather/SearchWeather";

function App() {
  const { position, error, getLocation } = useGeolocation();
  const dispatch = useDispatch<AppDispatch>();

  console.log(error);
  
  useEffect(() => {
    getLocation();
  }, [getLocation]);

  useEffect(() => {
    if (!position) return;
    dispatch(getWeatherByPosition(`${position.latitude},${position.longitude}`));
  }, [position, dispatch]);

  return (
    <Container>
      <SearchWeather/>
      <MainWidget/>
    </Container>
  );
}

export default App;