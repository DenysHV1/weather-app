import type { FC } from "react";
import s from "./Error.module.css";
import errorImg from "../../assets/error.png";
import { useSelector } from "react-redux";
import { selectIsError } from "../../redux/weather/selectors";
import { setErrorMessage } from "../../utils/setErrorMessage";

const ErrorComponent: FC = () => {
  const errorMessage = useSelector(selectIsError);

  return (
    <div className={s.error_wrapper}>
      <img className={s.error_img} src={errorImg} alt="error" />
      <p>{setErrorMessage(errorMessage)}</p>
    </div>
  );
};

export default ErrorComponent;
