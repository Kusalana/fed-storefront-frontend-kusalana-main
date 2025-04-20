import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "@/components/CartItem";

function CartPage() {
  const cart = useSelector((state) => state.cart.value);

  return (
    <main className="px-4 sm:px-6 md:px-8 py-6">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">My Cart</h2>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {cart.map((item, index) => (
          <CartItem key={index} item={item} />
        ))}
      </div>

      <div className="mt-6">
        {cart.length > 0 ? (
          <Button className="w-full sm:w-auto" asChild>
            <Link to="/shop/checkout">Proceed to Checkout</Link>
          </Button>
        ) : (
          <p className="text-gray-500">No items in cart</p>
        )}
      </div>
    </main>
  );
}

export default CartPage;
