import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout/Layout";
import ShopPage from "./pages/ShopPage/ShopPage";
import ShoppingCartPage from "./pages/ShoppingCartPage/ShoppingCartPage";
import OrderDetailsPage from "./pages/OrderDetailsPage/OrderDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ShopPage />} />
          <Route path="/cart" element={<ShoppingCartPage />} />
          <Route path="order-details/:id" element={<OrderDetailsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
