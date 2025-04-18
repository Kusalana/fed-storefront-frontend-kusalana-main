import { ShoppingCart } from "lucide-react";
import { Link } from "react-router";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { useSelector } from "react-redux";
import { useUser } from "@clerk/clerk-react";
import { Badge } from "@/components/ui/badge";

function Navigation(props) {
  const { user, isSignedIn, isLoaded } = useUser();

  const cart = useSelector((state) => state.cart.value);

  const getCartQuantity = () => {
    let count = 0;
    cart.forEach((item) => {
      count += item.quantity;
    });
    return count;
  };
  const isAdmin = isLoaded && user?.publicMetadata?.role === "admin";

  return (
    <nav className="flex items-center justify-between py-8 px-8">
      <div className="flex gap-x-16">
        <Link className="font-semibold text-3xl" to="/">
        Kusal&apos;s Reads
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <SignedIn>
            <Link to="/past-orders">Past Orders</Link>
          </SignedIn>
          {isAdmin && (
            <SignedIn>
              <Link to="/admin/products/create">Create Product</Link>
            </SignedIn>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div>
          <Link to="/shop/cart" className="flex items-center gap-1 relative">
            <div className="flex items-center gap-2">
              <ShoppingCart />
            </div>
            <Badge variant="destructive">
              <p className="text-xs">{getCartQuantity()}</p>
            </Badge>
          </Link>
        </div>

        <SignedOut>
          <div className="flex items-center gap-4">
            <Link to="/sign-in" className=" text-primary ">
              Sign In
            </Link>
            <Link to="/sign-up" className=" text-primary ">
              Sign Up
            </Link>
          </div>
        </SignedOut>

        <SignedIn>
          <UserButton />
          <Link to={"/account"}>Account</Link>
        </SignedIn>
      </div>
    </nav>
  );
}

export default Navigation;
