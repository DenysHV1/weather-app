import type { FC } from "react";
import s from "./Error.module.css";
import errorImg from "../../assets/error.png";

const ErrorComponent: FC = () => {
  return (
    <div className={s.error_wrapper}>
      <img className={s.error_img} src={errorImg} alt="error" />
    </div>
  );
};

export default ErrorComponent;
