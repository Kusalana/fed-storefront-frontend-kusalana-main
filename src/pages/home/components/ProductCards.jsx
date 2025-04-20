import ProductCard from "./ProductCard";

function ProductCards({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          _id={product._id}
          name={product.name}
          price={product.price}
          image={product.image}
          description={product.description}
          inventory={product.inventory}
        />
      ))}
    </div>
  );
}

export default ProductCards;
