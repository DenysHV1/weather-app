import { useDispatch } from "react-redux";
import s from "./CityItem.module.css";
import type { AppDispatch } from "../../redux/store";
import { IoClose } from "react-icons/io5";
import { getWetherByCity } from "../../redux/weather/thunks";

interface IProps {
  name: string;
  id: string;
  idx: number;
  setModal: (el: boolean) => void;
  setListId: (el: string) => void;
}

const CityItem = ({ name, id, idx, setModal, setListId }: IProps) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <div
        onClick={() => dispatch(getWetherByCity(name))}
        className={s.list_item_inner}
      >
        <span>{idx + 1}</span>
        <p>{name.length > 17 ? `${name.slice(0, 17)}...` : name}</p>
      </div>
      <button
        className={s.close}
        type="button"
        onClick={() => {
          setModal(true);
          setListId(id);
        }}
      >
        <IoClose />
      </button>
    </>
  );
};

export default CityItem;
