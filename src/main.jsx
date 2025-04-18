import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { store } from "@/lib/store";
import { Provider } from "react-redux";
import { ClerkProvider } from "@clerk/clerk-react";
import "./index.css";

import Protected from "@/layouts/Protected";
import AdminProtected from "@/layouts/AdminProtected";

import ProductDetailPage from "./pages/product-detail.page";
import ShopPage from "./pages/shop.page";
import CartPage from "./pages/cart.page";
import CheckoutPage from "./pages/checkout.page";
import HomePage from "./pages/home/home.page";
import SignInPage from "./pages/sign-in.page";
import SignUpPage from "./pages/sign-up.page";
import Success from "@/pages/success"; 

import MainLayout from "./layouts/main.layout";
import RootLayout from "./layouts/rootLayout/root.layout";
import AccountPage from "./pages/account.page";
import CompletePage from "./pages/complete.page";
import PaymentPage from "./pages/payment.page";
import Orders from "./pages/past-orders.page";

import AdminProductCreatePage from "./pages/admin-product-create.page";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env.local file");
}

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop/:productId" element={<ProductDetailPage />} />
              <Route path="/shop" element={<ShopPage />} />
          

              {/* The Protected layout can be used to wrap routes that needs to be logged in to access */}
              <Route element={<Protected />}>
                <Route path="/shop/cart" element={<CartPage />} />
                <Route path="/shop/checkout" element={<CheckoutPage />} />
                <Route path="/shop/payment" element={<PaymentPage />} />
                <Route path="/shop/complete" element={<CompletePage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/past-orders" element={<Orders />} />
                <Route path="/success" element={<Success />} />


                {/* The AdminProtected layout can be used to wrap routes that needs to be logged in as admin to access */}
                <Route element={<AdminProtected />}>
                  <Route
                    path="/admin/products/create"
                    element={<AdminProductCreatePage />}
                  />
                </Route>
              </Route>
            </Route>
          </Route>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </ClerkProvider>
  // </StrictMode>
);
