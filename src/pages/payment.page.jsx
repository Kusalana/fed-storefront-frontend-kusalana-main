import { Button } from "@/components/ui/button";
import { useGetOrderQuery } from "@/lib/api";
import { useSearchParams } from "react-router";
import { useDispatch } from "react-redux";
import { Link } from "react-router";

function PaymentPage() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { data, isLoading } = useGetOrderQuery(orderId);
  const dispatch = useDispatch();

  if (isLoading) {
    return <main className="px-8">Loading...</main>;
  }

  if (!data) {
    return <main className="px-8">Order data not found.</main>;
  }

  const userId = data.userId;
  const addressId = data.addressId;


  if (!userId || !addressId) {
    return <main className="px-8">User or Address data is missing.</main>;
  }

  return (
    <main className="px-8">
      <h2 className="text-4xl font-bold">Payment Details</h2>

      <div className="mt-4">
        <h3>Shipping Address</h3>
        <p>{data.addressId.line_1}</p>
        <p>{data.addressId.line_2}</p>
        <p>{data.addressId.city}</p>
        <p>{data.addressId.state}</p>
        <p>{data.addressId.zip_code}</p>
        <p>{data.addressId.phone}</p>
      </div>


      <div className="mt-4">
        <Button asChild>
          <Link to="/complete">Complete Payment</Link>
        </Button>
      </div>
    </main>
  );
}

export default PaymentPage;
