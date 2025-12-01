import { useDispatch, useSelector } from "react-redux";
import s from "./CurrentWeather.module.css";
import {
  selectCurrent,
  selectLocation,
  selectTempUnit,
} from "../../../redux/weather/selectors";

import { RiCelsiusFill } from "react-icons/ri";
import { RiFahrenheitFill } from "react-icons/ri";
import { setTempUnit } from "../../../redux/weather/slice";

import { TemperatureUnit } from "../../../redux/weather/types";
import clsx from "clsx";

const CurrentWeather = () => {
  const dispatch = useDispatch();
  const tempUnit = useSelector(selectTempUnit);

  const location = useSelector(selectLocation);
  const current = useSelector(selectCurrent);

  return (
    <>
      {current && (
        <div className={s.box}>
          <div className={s.top}>
            <div className={s.top_left}>
              <h1>{`${location?.name}, ${
                location?.region
              }  ${current?.last_updated.slice(10, 16)}`}</h1>
              <h2>{location?.country}</h2>
            </div>
            <div className={s.top_right}>
              <button
                type="button"
                onClick={() => dispatch(setTempUnit(TemperatureUnit.C))}
                className={clsx(
                  tempUnit === TemperatureUnit.C ? s.btn_active : s.btn
                )}
              >
                <RiCelsiusFill />
              </button>
              <button
                type="button"
                onClick={() => dispatch(setTempUnit(TemperatureUnit.F))}
                className={clsx(
                  tempUnit === TemperatureUnit.F ? s.btn_active : s.btn
                )}
              >
                <RiFahrenheitFill />
              </button>
            </div>
          </div>

          <div className={s.bottom}>
            <div className={s.img_box}>
              <img src={current?.condition.icon} alt="weather icon" />
            </div>
            <div className={s.temperature_box}>
              <div className={s.temperature}>
                <p>
                  {tempUnit === TemperatureUnit.C
                    ? current?.temp_c
                    : current?.temp_f}
                </p>
                <span>
                  {tempUnit === TemperatureUnit.C ? (
                    <RiCelsiusFill />
                  ) : (
                    <RiFahrenheitFill />
                  )}
                </span>
              </div>
              <h3>{current?.condition.text}</h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CurrentWeather;
