import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { clearCart } from "@/lib/features/cartSlice";
import { useDispatch } from "react-redux";

import {
  Form,
  FormControl,
  FormDescription,
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
    (value) => {
      return /^\+?[1-9]\d{1,14}$/.test(value);
    },
    {
      message: "Invalid phone number format",
    }
  ),
});

const ShippingAddressForm = ({ cart }) => {
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  const [createOrder, { isLoading, isError, data }] = useCreateOrderMutation();
  const [updateInventory] = useUpdateInventoryMutation();
  const navigate = useNavigate();

  console.log(cart);

  async function inventoryUpdate(cartItems) {
    try {
      for (const item of cartItems) {
        await updateInventory({
          productId: item.product._id,
          quantity: item.quantity,
        });
      }
      toast.success("Inventory updated successfully");
    } catch (error) {
      toast.error("Error updating inventory");
    }
  }

  // Handle form submit
  function handleSubmit(values) {
    // Create the order
    createOrder({
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

    inventoryUpdate(cart);

    // Clear cart and show success message
    toast.success("Checkout successful");
    dispatch(clearCart());

    // Navigate to shop or payment page
    navigate("/shop");
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
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
                    <Input placeholder="Wester Province" {...field} />
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
