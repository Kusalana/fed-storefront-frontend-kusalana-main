import "./Hero.css";
import { Button } from "@/components/ui/button";

function Hero() {
  return (
    <section className="px-8 py-8">
      <div className="hero-container">
        <div className="hero-content">
          <span className="discount-badge">WEEKLY DISCOUNT</span>
          <h1 className="hero-title">Discover Your Next Great Read</h1>
          <p>
            Explore our curated collection of fiction, non-fiction, science,
            history, and fantasy books. Whether you&apos;re a casual reader or a
            passionate bibliophile, find stories that inspire, educate, and
            entertain.
          </p>
          <Button className="w-fit" asChild>
            <a href="/shop">Shop Now</a>
          </Button>
        </div>
        <div className="hero-image-container">
          <img
            src="/assets/products/hero.jpg"
            alt=""
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
