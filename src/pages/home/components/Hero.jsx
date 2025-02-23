import "./Hero.css";
import { Button } from "@/components/ui/button";

function Hero() {
  return (
    <section className="px-8 py-8">
      <div className="hero-container">
        <div className="hero-content">
          <span className="discount-badge">WEEKLY DISCOUNT</span>
          <h1 className="hero-title">Premium Product Online Shop</h1>
          <p>
            Explore our top-quality mobile phones, smartwatches, and wearables
            designed to enhance your lifestyle. Stay connected, track your
            health, and enjoy the best technology in your hands.{" "}
          </p>
          <Button className="w-fit" asChild>
            <a href="/shop">Shop Now</a>
          </Button>
        </div>
        <div className="hero-image-container">
          <img
            src="https://fee-storefront.vercel.app/assets/hero/hero.jpg"
            alt=""
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
