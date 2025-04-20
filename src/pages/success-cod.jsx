import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const SuccessCod = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 py-8">
      <CheckCircle className="text-green-600" size={60} />
      <h1 className="text-3xl font-bold mt-4">Order Placed Successfully!</h1>
      <p className="text-gray-600 mt-2 max-w-md">
        Thank you for your purchase. Your order has been placed with <strong>Cash on Delivery</strong> as the payment method.
        <br />
        It will be delivered to your address within the next <strong>14 days</strong>.
      </p>
      <p className="text-sm text-muted-foreground mt-4">
        You will receive an email or SMS with the tracking details once your order is shipped.
      </p>
      <Button className="mt-6" asChild>
        <Link to="/">Back to Home</Link>
      </Button>
    </div>
  );
};

export default SuccessCod;
