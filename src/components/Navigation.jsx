import { ShoppingCart, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { useSelector } from "react-redux";
import { useUser } from "@clerk/clerk-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

function Navigation() {
  const { user, isSignedIn, isLoaded } = useUser();
  const cart = useSelector((state) => state.cart.value);
  const [menuOpen, setMenuOpen] = useState(false);

  const getCartQuantity = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  const isAdmin = isLoaded && user?.publicMetadata?.role === "admin";

  return (
    <nav className="py-4 px-6 border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Logo + Mobile Menu Toggle */}
        <div className="flex items-center justify-between w-full md:w-auto md:gap-x-16">
          <Link className="font-semibold text-2xl md:text-3xl" to="/">
            Kusal&apos;s Reads
          </Link>
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <Menu />
            </button>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
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

        {/* Right Side (Cart + Auth) */}
        <div className="flex items-center gap-4">
          <Link to="/shop/cart" className="flex items-center gap-2 relative">
            <ShoppingCart />
            <Badge variant="destructive" className="text-xs px-2 py-0.5">
              {getCartQuantity()}
            </Badge>
          </Link>

          <SignedOut>
            <div className="hidden md:flex items-center gap-2">
              <Link to="/sign-in" className="text-primary">
                Sign In
              </Link>
              <Link to="/sign-up" className="text-primary">
                Sign Up
              </Link>
            </div>
          </SignedOut>

          <SignedIn>
            <UserButton />
            <Link to="/account">Account</Link>
          </SignedIn>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-3">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
          <SignedIn>
            <Link to="/past-orders" onClick={() => setMenuOpen(false)}>Past Orders</Link>
            {isAdmin && (
              <Link to="/admin/products/create" onClick={() => setMenuOpen(false)}>Create Product</Link>
            )}
          </SignedIn>
          <SignedOut>
            <Link to="/sign-in" onClick={() => setMenuOpen(false)}>Sign In</Link>
            <Link to="/sign-up" onClick={() => setMenuOpen(false)}>Sign Up</Link>
          </SignedOut>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
