import { Button } from "@/components/ui/button";

function Hero() {
  return (
    <section className="px-4 py-8 sm:px-8">
      <div className="flex flex-col-reverse lg:flex-row items-center gap-8">
        {/* Content */}
        <div className="flex-1 text-center lg:text-left">
          <span className="inline-block bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
            WEEKLY DISCOUNT
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
            Discover Your Next Great Read
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mb-6">
            Explore our curated collection of fiction, non-fiction, science, history, and fantasy books.
            Whether you&apos;re a casual reader or a passionate bibliophile, find stories that inspire, educate,
            and entertain.
          </p>
          <Button className="w-full sm:w-fit" asChild>
            <a href="/shop">Shop Now</a>
          </Button>
        </div>

        {/* Image */}
        <div className="flex-1">
          <img
            src="/assets/products/hero.jpg"
            alt="Books"
            className="w-full h-auto rounded-md shadow-md"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
