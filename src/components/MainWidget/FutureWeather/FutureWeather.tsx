import { useDispatch, useSelector } from "react-redux";
import s from "./FutureWeather.module.css";
import { selectFuture, selectTempUnit } from "../../../redux/weather/selectors";
import { dateConvertor } from "../../../utils/dateConvertor";
import { setFutureData } from "../../../redux/weather/slice";
import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { swiperBreakpoints } from "../../../utils/swiperBreakpoints";
import { useState } from "react";
import type { IFutureDay } from "../../../redux/weather/types";

const FutureWeather = () => {
  const future = useSelector(selectFuture);
  const tempUnit = useSelector(selectTempUnit);
  const dispatch = useDispatch();

  const [activeIndex, setActiveIndex] = useState(0);

  const setTemp = (day: IFutureDay): string =>
    tempUnit === "C" ? `↓${day.mintemp_c}°` : `↓${day.mintemp_f}°`;

  const setTemp2 = (day: IFutureDay): string =>
    tempUnit === "C" ? `↑${day.maxtemp_c}°` : `↑${day.maxtemp_f}°`;

  return (
    <div className={s.box}>
      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={3}
        navigation
        breakpoints={swiperBreakpoints}
      >
        {future?.length &&
          future.map(({ date, day, date_epoch }, idx) => {
            if (!day) return null;

            return (
              <SwiperSlide key={date_epoch}>
                <button
                  type="button"
                  onClick={() => {
                    setActiveIndex(idx);
                    dispatch(setFutureData(idx));
                  }}
                  className={clsx(idx === activeIndex ? s.btn_active : s.btn)}
                >
                  <span className={s.day}>{dateConvertor(date)}</span>

                  <img
                    className={s.icon}
                    src={day.condition?.icon || ""}
                    alt="icon"
                  />

                  <span className={s.temp}>
                    {setTemp(day)}
                    <span>{setTemp2(day)}</span>
                  </span>
                </button>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};

export default FutureWeather;
