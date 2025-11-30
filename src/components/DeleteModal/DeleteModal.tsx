import { useDispatch } from "react-redux";
import s from "./DeleteModal.module.css";
import type { AppDispatch } from "../../redux/store";
import { deleteListItem } from "../../redux/weather/slice";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

interface IProps {
  id: string;
  setModal: (el: boolean) => void;
}

const DeleteModal = ({ id, setModal }: IProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteYes = () => {
    dispatch(deleteListItem(id));
    setModal(false);

    iziToast.info({
      timeout: 3000,
      title: "Delete",
      message: "City removed from list!",
      position: "bottomLeft",
    });
  };

  const handleDeleteNo = () => {
    setModal(false);

    iziToast.info({
      timeout: 2000,
      title: "Delete",
      message: "Deletion canceled!",
      position: "bottomLeft",
    });
  };

  return (
    <div className={s.wrapper}>
      <div className={s.wrapper_inner}>
        <h3>Ara you sure?</h3>
        <div className={s.buttons}>
          <button className={s.button} onClick={handleDeleteYes} type="button">
            Yes
          </button>
          <button className={s.button} onClick={handleDeleteNo} type="button">
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
