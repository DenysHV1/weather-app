import s from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={s.loader_wrapper}>
      <span className={s.loader}></span>
    </div>
  );
};

export default Loader;
