import { useSelector } from "react-redux";
import CurrentWeather from "./CurrentWeather/CurrentWeather";
import {
  selectIsError,
  selectIsLoading,
  selectLocation,
} from "../../redux/weather/selectors";
import Loader from "../Loader/Loader";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import DayWeather from "./DayWeather/DayWeather";
import FutureWeather from "./FutureWeather/FutureWeather";

interface IProps {
  error: string | null;
}

const MainWidget = ({ error }: IProps) => {
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const location = useSelector(selectLocation);

  if (isLoading) {
    return (
      <div className="main-widget">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="main-widget">
        <ErrorComponent />
      </div>
    );
  }

  if (error && !location) {
    return (
      <>
        <div className="main-widget">
          <ErrorComponent message="Geolocation is disabled in your browser!" />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="main-widget">
        <CurrentWeather />
        <DayWeather />
        <FutureWeather />
      </div>
    </>
  );
};

export default MainWidget;
