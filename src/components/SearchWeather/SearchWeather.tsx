import { useState, type FormEvent, type ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import s from "./SearchWeather.module.css";
import { getWetherByCity } from "../../redux/weather/thunks";
import type { AppDispatch } from "../../redux/store";

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

    dispatch(getWetherByCity(trimmedQuery));
  };

  return (
    <header className={s.box}>
      <h1 className={s.title}>Weather App</h1>

      <form onSubmit={handleSubmit} className={s.form}>
        <input
          className={s.input}
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search city..."
        />
        <button
          className={s.button}
          type="submit"
          disabled={!query.trim()}
        >
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchWeather;
