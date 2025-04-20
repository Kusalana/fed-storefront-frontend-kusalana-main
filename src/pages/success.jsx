import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();

  return (
    <section className="px-4 sm:px-8 py-20 text-center">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-green-600">
          Payment Successful!
        </h1>
        <p className="text-base sm:text-lg text-gray-700 mb-6">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
        <Button className="w-fit" onClick={() => navigate("/")}>
          Go to Home
        </Button>
      </div>
    </section>
  );
}

export default Success;
