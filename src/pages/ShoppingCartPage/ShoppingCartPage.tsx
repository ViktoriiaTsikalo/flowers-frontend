import React from "react";
import CartForm, {
  type CustomerData,
} from "../../components/CartForm/CartForm";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  createOrder,
  type ICreateOrderPayload,
} from "../../redux/orders/operations";
import { removeFromCart } from "../../redux/flowers/slice";
import { selectCart } from "../../redux/flowers/selectors";
import { useNavigate } from "react-router-dom";
import {
  selectOrderLoading,
  selectOrderError,
} from "../../redux/orders/selectors";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-hot-toast";

const ShoppingCartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cart = useAppSelector(selectCart);
  const isLoading = useAppSelector(selectOrderLoading);
  const orderError = useAppSelector(selectOrderError);

  const handleSubmit = async (values: CustomerData) => {
    if (cart.length === 0) {
      toast.error("Cart is empty!");
      return;
    }

    const orderPayload: ICreateOrderPayload = {
      items: cart.map((item) => ({
        flower: item._id,
        quantity: item.quantity,
      })),
      customerName: values.customerName,
      email: values.email,
      phone: values.phone,
      address: values.address,
    };

    try {
      const resultAction = await dispatch(createOrder(orderPayload));

      if (createOrder.fulfilled.match(resultAction)) {
        cart.forEach((item) => dispatch(removeFromCart(item._id)));

        const order = resultAction.payload.data;

        toast.success("Order successfully created!");

        navigate(`/order-details/${order._id}`);
      } else {
        toast.error(`Failed to create order: ${resultAction.payload}`);
      }
    } catch (error) {
      toast.error(`Error submitting order: ${error}`);
    }
  };

  React.useEffect(() => {
    if (orderError) {
      toast.error(`Order error: ${orderError}`);
    }
  }, [orderError]);

  return (
    <>
      {isLoading && <Loader />}
      <CartForm onSubmit={handleSubmit} />
    </>
  );
};

export default ShoppingCartPage;
