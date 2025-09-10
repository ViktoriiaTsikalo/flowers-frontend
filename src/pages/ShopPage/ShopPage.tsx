import { useState, useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";
import { toast } from "react-hot-toast";
import s from "./ShopPage.module.css";
import ShopsList from "../../components/ShopsList/ShopsList";
import FlowersList from "../../components/FlowersList/FlowersList";
import type { IStore } from "../../redux/stores/operations";
import {
  selectStoresLoading,
  selectStoresError,
} from "../../redux/stores/selectors";
import {
  selectFlowersLoading,
  selectFlowersError,
} from "../../redux/flowers/selectors";
import Loader from "../../components/Loader/Loader";

const ShopPage: React.FC = () => {
  const [selectedStore, setSelectedStore] = useState<IStore | null>(null);

  const storesLoading = useAppSelector(selectStoresLoading);
  const flowersLoading = useAppSelector(selectFlowersLoading);

  const storesError = useAppSelector(selectStoresError);
  const flowersError = useAppSelector(selectFlowersError);

  const isLoading = storesLoading || flowersLoading;

  useEffect(() => {
    if (storesError) toast.error(`Stores error: ${storesError}`);
    if (flowersError) toast.error(`Flowers error: ${flowersError}`);
  }, [storesError, flowersError]);

  return (
    <div className={`${s.shopPage} container`}>
      {isLoading && <Loader />}

      <ShopsList
        selectedStore={selectedStore}
        onSelectStore={setSelectedStore}
      />
      <FlowersList storeId={selectedStore?._id} />
    </div>
  );
};

export default ShopPage;
