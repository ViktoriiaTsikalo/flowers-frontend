import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchOrderDetails,
  type IOrderDetails,
} from "../../redux/orders/operations";
import {
  selectOrder,
  selectOrderError,
  selectOrderLoading,
} from "../../redux/orders/selectors";
import s from "./OrderDetailsPage.module.css";
import Loader from "../../components/Loader/Loader";

const OrderDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const order = useAppSelector(selectOrder) as IOrderDetails | null;
  const isLoading = useAppSelector(selectOrderLoading);
  const error = useAppSelector(selectOrderError);

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderDetails(id));
    }
  }, [dispatch, id]);

  if (error) return <p>Error: {error}</p>;
  if (!order) return <p>No order found</p>;

  const orderDate = new Date(order.orderDate).toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className={`${s.order} container`}>
      {isLoading && <Loader />}
      <h2>Order Details</h2>
      <h3>Order #{order.orderNumber}</h3>
      <ul className={s.orderList}>
        {order.items.map((item, idx) => (
          <li className={s.orderListItem} key={idx}>
            <p>{item.name}</p>
            <p>
              {item.quantity} × {item.price} = {item.subtotal} ₴
            </p>
          </li>
        ))}
      </ul>
      <div className={s.orderDetail}>
        <p>Total:</p> <p>{order.totalPrice} ₴</p>
      </div>
      <div className={s.orderDetail}>
        {" "}
        <p>Delivery Address:</p> <p>{order.address}</p>
      </div>
      <div className={s.orderDetail}>
        <p>Date:</p> <p>{orderDate}</p>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
