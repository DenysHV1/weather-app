import { useSelector } from "react-redux";
import CurrentWeather from "./CurrentWeather/CurrentWeather";
import { selectIsError, selectIsLoading } from "../../redux/weather/selectors";
import Loader from "../Loader/Loader";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import DayWeather from "./DayWeather/DayWeather";



const MainWidget = () => {
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  if (isLoading) {
    return (
      <div className="main-widget">
        <Loader/>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="main-widget">
        <ErrorComponent/>
      </div>
    );
  }

  return (
    <>
      <div className="main-widget">
        <CurrentWeather />
        <DayWeather/>
      </div>
    </>
  );
};

export default MainWidget;
