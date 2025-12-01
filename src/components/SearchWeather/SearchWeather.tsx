import { useState, type FormEvent, type ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import s from "./SearchWeather.module.css";
import { getWetherByCity } from "../../redux/weather/thunks";
import type { AppDispatch } from "../../redux/store";

import logo from "../../assets/logo.png";
import iziToast from "izitoast";

const SearchWeather = () => {
  const [query, setQuery] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      return;
    }

    dispatch(getWetherByCity(trimmedQuery))
      .unwrap()
      .then((status) => {
        if (status) {
          iziToast.success({
            timeout: 2000,
            title: "Success",
            message: "Weather data loaded successfully.",
            position: "bottomLeft",
          });
        }
      })
      .catch((err) => {
        iziToast.error({
          timeout: 2000,
          title: "Error",
          message: err,
          position: "bottomLeft",
        });
      });
    setQuery("");
  };

  return (
    <header className={s.box}>
      <img className={s.logo} src={logo} alt="logo" />

      <form onSubmit={handleSubmit} className={s.form}>
        <input
          className={s.input}
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search city..."
        />
        <button className={s.button} type="submit" disabled={!query.trim()}>
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchWeather;
