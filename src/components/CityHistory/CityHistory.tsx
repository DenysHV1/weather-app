import { useSelector } from "react-redux";
import s from "./CityHistory.module.css";
import { selectCityList } from "../../redux/weather/selectors";
import list from "../../assets/list.png";
import CityItem from "../CityItem/CityItem";
import { useState } from "react";
import DeleteModal from "../DeleteModal/DeleteModal";

const CityHistory = () => {
  const [modal, setModal] = useState(false);
  const [listId, setListId] = useState<string>("");
  const cityList = useSelector(selectCityList);

  return (
    <div className={s.box}>
      {cityList.length > 0 ? (
        <>
          <h2 className={s.title}>Your search history</h2>
          <ul className={s.list}>
            {cityList.map(({ name, id }, idx) => {
              return (
                <CityItem
                  name={name}
                  id={id}
                  idx={idx}
                  setModal={setModal}
                  setListId={setListId}
                />
              );
            })}
          </ul>
        </>
      ) : (
        <div className={s.empty_box}>
          <h2>Find a city to add to your list!</h2>
          <img src={list} alt="icon" />
        </div>
      )}
      {modal && <DeleteModal id={listId} setModal={setModal} />}
    </div>
  );
};

export default CityHistory;
