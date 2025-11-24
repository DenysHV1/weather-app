import type { FC } from "react";
import s from "./loader.module.css";

export const Loader: FC = () => {
  return <span className={s.loader}></span>;
};

export default Loader;
