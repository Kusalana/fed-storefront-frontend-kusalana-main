import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { clearCart } from "@/lib/features/cartSlice";
import { useDispatch } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router";
import { useCreateOrderMutation, useUpdateInventoryMutation } from "@/lib/api";
import { toast } from "sonner";

const formSchema = z.object({
  line_1: z.string().min(1),
  line_2: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  zip_code: z.string().min(1),
  phone: z.string().refine(
    (value) => /^\+?[1-9]\d{1,14}$/.test(value),
    { message: "Invalid phone number format" }
  ),
});

const ShippingAddressForm = ({ cart }) => {
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const [createOrder] = useCreateOrderMutation();
  const [updateInventory] = useUpdateInventoryMutation();
  const navigate = useNavigate();

  async function inventoryUpdate(cartItems) {
    try {
      for (const item of cartItems) {
        await updateInventory({
          productId: item.product._id,
          quantity: item.quantity,
        });
      }
    } catch (error) {
      toast.error("Error updating inventory");
      console.error(error);
    }
  }

  async function handleSubmit(values, event) {
    event?.preventDefault();

    try {
      await createOrder({
        items: cart,
        shippingAddress: {
          line_1: values.line_1,
          line_2: values.line_2,
          city: values.city,
          state: values.state,
          zip_code: values.zip_code,
          phone: values.phone,
        },
      });

      await inventoryUpdate(cart);

      dispatch(clearCart());
      toast.success("Order created successfully");

      const cartItems = cart.map((item) => ({
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      }));

      const res = await fetch("https://fed-storefront-backend-kusalana.onrender.com", {
      //const res = await fetch("http://localhost:8000/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems }),
      });

      const data = await res.json();
      console.log("Stripe session data:", data);

      const stripe = await loadStripe("pk_test_51OWYYoSBJOn5pe8CDkcTkxyy6og0Ro3kYEIuoMwzedJ0oSpiqMRQf2x6DKx87R26jn44xD0tdeyvLZTUY3ZozAtb00sgHpXiWT");

      if (data?.sessionId) {
        await stripe.redirectToCheckout({ sessionId: data.sessionI });
      } else {
        navigate("/success-cod");
      }

    } catch (error) {
      console.error(error);
      navigate("/success-cod");
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={(e) =>
            form.handleSubmit((values) => handleSubmit(values, e))(e)
          }
        >
          <div className="grid grid-cols-2 gap-y-2 gap-x-4">
            <FormField
              control={form.control}
              name="line_1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Line 1</FormLabel>
                  <FormControl>
                    <Input placeholder="16/1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="line_2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Line 2</FormLabel>
                  <FormControl>
                    <Input placeholder="Main St" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Kadawatha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State/Province</FormLabel>
                  <FormControl>
                    <Input placeholder="Western Province" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zip_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input placeholder="11850" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+94702700100" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-4">
            <Button type="submit">Proceed to Payment</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ShippingAddressForm;
