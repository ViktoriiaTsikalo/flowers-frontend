import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import s from "./CartForm.module.css";
import CartItems from "../CartItems/CartItems";

export interface CustomerData {
  customerName: string;
  email: string;
  phone: string;
  address: string;
}

interface CartFormProps {
  onSubmit: (values: CustomerData) => void;
}

const CartForm: React.FC<CartFormProps> = ({ onSubmit }) => {
  const validationSchema = Yup.object().shape({
    customerName: Yup.string().min(2, "Too Short!").required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    phone: Yup.string().min(5, "Too Short!").required("Required"),
    address: Yup.string().min(5, "Too Short!").required("Required"),
  });

  const handleSubmit = (values: CustomerData) => {
    onSubmit(values);
  };

  return (
    <Formik
      initialValues={{
        customerName: "",
        email: "",
        phone: "",
        address: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className={`${s.form} container`}>
          <div className={s.formDetails}>
            <div>
              <label className={s.label}>
                Name
                <Field className={s.input} name="customerName" />
                <ErrorMessage
                  name="customerName"
                  component="div"
                  className={s.error}
                />
              </label>

              <label className={s.label}>
                Email
                <Field className={s.input} name="email" type="email" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={s.error}
                />
              </label>

              <label className={s.label}>
                Phone
                <Field className={s.input} name="phone" />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className={s.error}
                />
              </label>

              <label className={s.label}>
                Address
                <Field className={s.input} name="address" />
                <ErrorMessage
                  name="address"
                  component="div"
                  className={s.error}
                />
              </label>
            </div>

            <CartItems />
          </div>

          <button type="submit" className={s.submitBtn}>
            Submit Order
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default CartForm;
