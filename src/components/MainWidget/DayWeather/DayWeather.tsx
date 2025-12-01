import s from "./DayWeather.module.css";
import { useSelector } from "react-redux";
import { selectDay, selectTempUnit } from "../../../redux/weather/selectors";
import {
  TemperatureUnit,
  type IWeatherObj,
} from "../../../redux/weather/types";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

interface ChartPoint {
  id: number;
  time: string;
  temp: number;
  label: number | null;
  icon: string;
  wind: number;
  precip: number;
}

const DayWeather = () => {
  const day = useSelector(selectDay) as IWeatherObj[];
  const tempUnit = useSelector(selectTempUnit);

  const getChartData = (): ChartPoint[] => {
    return day?.map((item, index) => {
      const temp = tempUnit === TemperatureUnit.C ? item.temp_c : item.temp_f;
      return {
        id: item.time_epoch ?? index,
        time: item.time ? item.time.slice(11, 16) : "",
        temp,
        label: temp,
        icon: item.condition?.icon ?? "",
        wind: item.wind_kph,
        precip: item?.precip_mm,
      };
    });
  };

  return (
    <>
      {day.length > 0 && (
        <div className={s.box}>
          <div className={s.scrollArea}>
            <div
              className={s.scrollContent}
              style={{ width: getChartData().length * 55 }}
            >
              <div className={s.chartContainer}>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart
                    data={getChartData()}
                    margin={{ top: 30, right: 20, left: 20, bottom: 50 }}
                  >
                    <defs>
                      <linearGradient
                        id="tempGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#7da7ff"
                          stopOpacity={0.5}
                        />
                        <stop
                          offset="100%"
                          stopColor="#0f111a"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>

                    <Area
                      type="monotone"
                      dataKey="precip"
                      stroke="#4fc2f7b9"
                      strokeWidth={1}
                      fill="rgba(79,195,247,0.2)"
                    >
                      <LabelList
                        dataKey="precip"
                        position="top"
                        formatter={(v) => {
                          const num = Number(v);
                          return num > 0 ? `${num}mm` : "";
                        }}
                        style={{
                          fill: "#4fc2f7",
                          fontSize: 10,
                          fontWeight: 400,
                        }}
                      />
                    </Area>

                    <Area
                      type="monotone"
                      dataKey="temp"
                      stroke="#9fc0ff"
                      strokeWidth={2}
                      fill="url(#tempGradient)"
                    >
                      <LabelList
                        dataKey="label"
                        position="top"
                        formatter={(v) => (v == null ? "" : `${v}°`)}
                        style={{
                          fill: "#ffffffc5",
                          fontSize: 14,
                          fontWeight: 500,
                          textShadow: "0 0 4px rgba(0,0,0,0.6)",
                        }}
                      />
                    </Area>

                    <XAxis
                      dataKey="time"
                      interval={0}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#fff", fontSize: 12 }}
                    />

                    <YAxis hide />

                    <Tooltip
                      formatter={(value: number, name) =>
                        name === "precip" ? `${value} mm` : `${value}°`
                      }
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className={s.iconsRow}>
                {getChartData().map((p) => (
                  <div key={p.id} className={s.iconCell} style={{ width: 55 }}>
                    <img src={p.icon} alt="icon" />
                    <p>
                      {p.wind}
                      <span> km/h</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DayWeather;
