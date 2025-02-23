import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "./home/components/ProductCard";
import DetailCard from "./home/components/DetailCard";

const ProductDetailPage = () => {
  const { productId } = useParams();

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useGetProductByIdQuery(productId);

  if (isLoading) {
    return (
      <div>
        <Skeleton className="h-96" />
        <Skeleton className="h-16" />
        <Skeleton className="h-20" />
      </div>
    );
  }

  if (isError) {
    return <p>{`Error fetching product: ${error.message}`}</p>;
  }

  return (
    <div>
       <DetailCard

            key={product._id}
            _id={product._id}
            name={product.name}
            price={product.price}
            image={product.image}
            description={product.description}
            inventory={product.inventory}
          />
    
    </div>
  );
};

export default ProductDetailPage;
