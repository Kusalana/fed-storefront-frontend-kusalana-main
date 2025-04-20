import { useGetOrdersQuery } from "@/lib/api";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/lib/features/userSlice";
import { useUser } from "@clerk/clerk-react";

function Orders() {
  const dispatch = useDispatch();
  const { user, isLoaded } = useUser();
  const userId = useSelector((state) => state.user.id);

  if (isLoaded && user && !userId) {
    dispatch(setUser({ id: user.id }));
  }

  const {
    data: orders,
    isLoading: isOrdersLoading,
    isError: isOrdersError,
  } = useGetOrdersQuery();

  if (isOrdersLoading) {
    return (
      <section className="px-4 sm:px-8 py-8">
        <h2 className="text-2xl sm:text-4xl font-bold">Order History</h2>
        <Separator className="mt-2" />
        <div className="mt-4 grid gap-4">
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
        </div>
      </section>
    );
  }

  if (isOrdersError) {
    return (
      <section className="px-4 sm:px-8 py-8">
        <h2 className="text-2xl sm:text-4xl font-bold">Order History</h2>
        <Separator className="mt-2" />
        <p className="text-red-500 mt-4">Error fetching orders</p>
      </section>
    );
  }

  if (!orders || !Array.isArray(orders)) {
    return (
      <section className="px-4 sm:px-8 py-8">
        <h2 className="text-2xl sm:text-4xl font-bold">Order History</h2>
        <Separator className="mt-2" />
        <p className="mt-4">No orders found or invalid data format.</p>
      </section>
    );
  }

  const userOrders = orders.filter((order) => order.userId === userId);

  return (
    <section className="px-4 sm:px-8 py-8">
      <h2 className="text-2xl sm:text-4xl font-bold">Order History</h2>
      <Separator className="mt-2" />

      {userOrders.length === 0 ? (
        <p className="mt-4">No past orders in your name.</p>
      ) : (
        <div className="mt-4 space-y-6">
          {userOrders.map((order) => (
            <div
              key={order._id}
              className="border p-4 rounded-lg shadow-sm space-y-4"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold">
                    Order ID: {order._id}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-sm text-gray-700 space-y-1 sm:text-right">
                  <p>Order Status: <strong>{order.orderStatus}</strong></p>
                  <p>Payment Status: <strong>{order.paymentStatus}</strong></p>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div>
                      <h4 className="font-semibold">{item.product.name}</h4>
                      <p className="text-sm text-gray-600">
                        {item.product.description}
                      </p>
                      <p className="font-medium">{item.product.price} Rs.</p>
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
