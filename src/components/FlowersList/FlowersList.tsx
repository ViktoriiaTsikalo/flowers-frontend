import { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectFlowers,
  selectCart,
  selectFavorites,
} from "../../redux/flowers/selectors";
import {
  fetchFlowers,
  type GetFlowersOptions,
  type IFlower,
} from "../../redux/flowers/operations";
import { toggleCart, toggleFavorite } from "../../redux/flowers/slice";
import s from "./FlowersList.module.css";

interface FlowersListProps {
  storeId?: string;
}

const FlowersList: React.FC<FlowersListProps> = ({ storeId }) => {
  const dispatch = useAppDispatch();
  const flowers = useAppSelector(selectFlowers);
  const cart = useAppSelector(selectCart);
  const favorites = useAppSelector(selectFavorites);

  const [sortOptions, setSortOptions] = useState<GetFlowersOptions>({
    sortBy: "price",
    sortOrder: "asc",
  });

  useEffect(() => {
    dispatch(fetchFlowers({ ...sortOptions, storeId }));
  }, [dispatch, sortOptions, storeId]);

  const handleSortByPrice = () => {
    setSortOptions({ sortBy: "price", sortOrder: "asc" });
  };

  const handleSortByDate = () => {
    setSortOptions({ sortBy: "addedAt", sortOrder: "desc" });
  };

  const isInCart = (id: string) => cart.some((item) => item._id === id);

  const sortedFlowers = useMemo(() => {
    return [...flowers].sort((a, b) => {
      const aFav = favorites.includes(a._id) ? 0 : 1;
      const bFav = favorites.includes(b._id) ? 0 : 1;
      if (aFav !== bFav) return aFav - bFav;

      if (sortOptions.sortBy === "price") {
        return sortOptions.sortOrder === "asc"
          ? a.price - b.price
          : b.price - a.price;
      } else if (sortOptions.sortBy === "addedAt") {
        return sortOptions.sortOrder === "asc"
          ? new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime()
          : new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
      }
      return 0;
    });
  }, [flowers, favorites, sortOptions]);

  return (
    <div className={s.flowers}>
      <div className={s.sortButtons}>
        <button className={s.btn} onClick={handleSortByPrice}>
          Sort by price
        </button>
        <button className={s.btn} onClick={handleSortByDate}>
          Sort by date
        </button>
      </div>

      <ul className={s.flowersList}>
        {sortedFlowers.map((flower: IFlower) => {
          const isFavorite = favorites.includes(flower._id);
          const handleFavoriteClick = () =>
            dispatch(toggleFavorite(flower._id));
          const inCart = isInCart(flower._id);

          return (
            <li className={s.flowersListItem} key={flower._id}>
              <button
                type="button"
                className={`${s.favoriteButton} ${isFavorite ? s.active : ""}`}
                onClick={handleFavoriteClick}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>

              <img src={flower.photo} alt={flower.name} className={s.photo} />
              <div className={s.titleAndBtn}>
                <div className={s.title}>
                  <p>{flower.name}</p>
                  <p>{flower.price}₴</p>
                </div>
                <button
                  className={s.btn}
                  onClick={() =>
                    dispatch(
                      toggleCart({
                        _id: flower._id,
                        name: flower.name,
                        photo: flower.photo,
                        price: flower.price,
                        quantity: 1,
                      })
                    )
                  }
                >
                  {inCart ? "Remove" : "Add to cart"}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FlowersList;
