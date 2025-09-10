import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchStores, type IStore } from "../../redux/stores/operations";
import { selectStores } from "../../redux/stores/selectors";
import s from "./ShopsList.module.css";

interface ShopsListProps {
  selectedStore: IStore | null;
  onSelectStore: (store: IStore) => void;
}

const ShopsList: React.FC<ShopsListProps> = ({
  selectedStore,
  onSelectStore,
}) => {
  const dispatch = useAppDispatch();
  const stores = useAppSelector(selectStores);

  useEffect(() => {
    dispatch(fetchStores());
  }, [dispatch]);

  return (
    <div className={s.shopsListContainer}>
      <h3>Shops:</h3>

      <ul className={s.shopsList}>
        {stores.map((store) => (
          <li
            key={store._id}
            className={`${s.shopsListItem} ${
              selectedStore?._id === store._id ? s.active : ""
            }`}
            onClick={() => onSelectStore(store)}
          >
            {store.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShopsList;
