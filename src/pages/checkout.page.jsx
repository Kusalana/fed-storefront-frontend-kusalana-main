import ShippingAddressForm from "@/components/ShippingAddressForm";
import { useSelector } from "react-redux";
import CartItem from "@/components/CartItem";
import { Navigate } from "react-router-dom";

function CheckoutPage() {
  const cart = useSelector((state) => state.cart.value);

  if (cart.length === 0) {
    return <Navigate to="/" />;
  }

  return (
    <main className="px-4 sm:px-6 md:px-8 py-6">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Checkout Page</h2>

      {/* Order Details */}
      <div className="mt-6">
        <h3 className="text-xl sm:text-2xl font-semibold">Order Details</h3>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {cart.map((item, index) => (
            <CartItem key={index} item={item} />
          ))}
        </div>
      </div>

      {/* Shipping Address Form */}
      <div className="mt-8">
        <h3 className="text-xl sm:text-2xl font-semibold">Enter Shipping Address</h3>
        <div className="mt-4 w-full lg:w-2/3 xl:w-1/2">
          <ShippingAddressForm cart={cart} />
        </div>
      </div>
    </main>
  );
}

export default CheckoutPage;
