import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/lib/features/cartSlice";
import { toast } from "sonner";

function DetailCard(props) {
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
    <Card className="max-w-lg mx-auto bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-6 my-4 h-96">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-shrink-0 w-full md:w-1/3 rounded-xl overflow-hidden shadow-lg">
          <img
            src={props.image}
            alt={props.name}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        <div className="flex flex-col justify-between mt-4 md:mt-0 md:w-2/3">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-semibold text-gray-900">
              {props.name}
            </h2>
            <p className="text-lg text-gray-600 mt-2">{props.description}</p>
            <span className="block text-xl font-medium text-gray-900 mt-2">
              Price: Rs. {props.price}
            </span>
          </div>

          <Button
            className="mt-24 w-full text-white py-3 rounded-lg shadow-md transform transition-all hover:scale-105"
            onClick={handleClick}
            disabled={props.inventory <= 0}
          >
            {props.inventory <= 0 ? "Out of Stock" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default DetailCard;
