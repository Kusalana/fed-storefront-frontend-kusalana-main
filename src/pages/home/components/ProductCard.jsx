import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/lib/features/cartSlice";
import { Link } from 'react-router-dom';
import { toast } from "sonner";

function ProductCard(props) {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    toast.success("Added to cart successfully");
    dispatch(
      addToCart({
        _id: props._id,
        name: props.name,
        price: props.price,
        image: props.image,
        description: props.description,
        inventory: props.inventory,
      })
    );
  };

  return (
    <Card className="flex flex-col justify-between h-full overflow-hidden">
      <Link to={`/shop/${props._id}`} key={props.name}>
        <div className="h-56 sm:h-64 md:h-72 bg-card rounded-t-lg p-4 flex items-center justify-center">
          <img
            src={props.image}
            alt={props.name}
            className="object-contain max-h-full w-full"
          />
        </div>

        <div className="p-4 space-y-2">
          <h2 className="text-base sm:text-lg font-semibold truncate">{props.name}</h2>
          <p className="text-sm sm:text-base font-medium text-muted-foreground">
            Rs. {props.price}
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
            {props.description}
          </p>
        </div>
      </Link>

      <div className="p-4 mt-auto">
        <Button
          className="w-full"
          onClick={handleClick}
          disabled={props.inventory <= 0}
        >
          {props.inventory <= 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </div>
    </Card>
  );
}

export default ProductCard;
