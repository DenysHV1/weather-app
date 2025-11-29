import { useEffect } from "react";
import { Container } from "./components/container/Container";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./redux/store";
import { getWeatherByPosition } from "./redux/weather/thunks";
import { useGeolocation } from "./hooks/useGeolocation";

function App() {
  const { position, error, getLocation } = useGeolocation();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  useEffect(() => {
    if (!position) return;
    dispatch(getWeatherByPosition(`${position.latitude},${position.longitude}`));
  }, [position, dispatch]);

  return (
    <Container>
      <div></div>
    </Container>
  );
}

export default App;


