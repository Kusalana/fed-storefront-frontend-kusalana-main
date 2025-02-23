import { useGetOrdersQuery } from "@/lib/api";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/lib/features/userSlice";
import { useUser } from "@clerk/clerk-react"; // Clerk's hook

function Orders() {
  const dispatch = useDispatch();
  const { user, isLoaded } = useUser(); // Get user data from Clerk
  const userId = useSelector((state) => state.user.id);

  // Set the userId in Redux if it's not set yet
  if (isLoaded && user && !userId) {
    dispatch(setUser({ id: user.id })); // Set the userId in Redux store
  }

  const {
    data: orders,
    isLoading: isOrdersLoading,
    isError: isOrdersError,
    error: ordersError,
  } = useGetOrdersQuery();

  if (isOrdersLoading) {
    return (
      <section className="px-8 py-8">
        <h2 className="text-4xl font-bold">Order History</h2>
        <Separator className="mt-2" />
        <div className="mt-4 flex items-center gap-4">
          <Skeleton className="h-16" />
        </div>
        <div className="grid grid-rows-4 gap-4 mt-4">
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
        </div>
      </section>
    );
  }

  // Error handling
  if (isOrdersError) {
    return (
      <section className="px-8 py-8">
        <h2 className="text-4xl font-bold">Order History</h2>
        <Separator className="mt-2" />
        <div className="mt-4">
          <p className="text-red-500">{`Error fetching orders`}</p>
        </div>
      </section>
    );
  }

  if (!orders || !Array.isArray(orders)) {
    return (
      <section className="px-8 py-8">
        <h2 className="text-4xl font-bold">Order History</h2>
        <Separator className="mt-2" />
        <p>No orders found or invalid data format.</p>
      </section>
    );
  }

  // Filter orders by the userId from Redux
  const userOrders = orders.filter((order) => order.userId === userId);

  return (
    <section className="px-8 py-8">
      <h2 className="text-4xl font-bold">Order History</h2>
      <Separator className="mt-2" />

      {userOrders.length === 0 ? (
        <p>No past orders in your name.</p>
      ) : (
        <div className="mt-4 space-y-6">
          {userOrders.map((order) => (
            <div key={order._id} className="border p-4 rounded-lg shadow-sm">
              {/* Order Header */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-xl font-semibold">
                    Order ID: {order._id}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span className="block text-sm">
                    Order Status: {order.orderStatus}
                  </span>
                  <span className="block text-sm">
                    Payment Status: {order.paymentStatus}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item._id} className="flex items-center gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover"
                    />
                    <div>
                      <h4 className="font-semibold">{item.product.name}</h4>
                      <p className="text-sm text-gray-600">
                        {item.product.description}
                      </p>
                      <p className="text-md font-medium">
                        {item.product.price} USD
                      </p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Orders;
