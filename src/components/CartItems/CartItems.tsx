import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../../redux/flowers/slice";
import { selectCart } from "../../redux/flowers/selectors";
import s from "./CartItems.module.css";

const CartItems: React.FC = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCart);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) return <p>Your cart is empty</p>;

  return (
    <div>
      <ul className={s.cartList}>
        {cart.map((item) => (
          <li key={item._id} className={s.item}>
            <img src={item.photo} alt={item.name} className={s.photo} />
            <div className={s.info}>
              <p>{item.name}</p>
              <p>{item.price} ₴</p>
            </div>
            <div className={s.buttons}>
              <div className={s.controls}>
                <button
                  type="button"
                  className={s.controlsBtn}
                  onClick={() => dispatch(decreaseQuantity(item._id))}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  type="button"
                  className={s.controlsBtn}
                  onClick={() => dispatch(increaseQuantity(item._id))}
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className={s.remove}
                onClick={() => dispatch(removeFromCart(item._id))}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <p className={s.totalPrice}>Total: {totalPrice} ₴</p>
    </div>
  );
};

export default CartItems;
