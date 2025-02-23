import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "@/lib/api";

function AdminProductCreatePage() {
  const [formData, setFormData] = useState({
    categoryId: "",
    image: "",
    name: "",
    price: "",
    description: "",
    inventory: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [createProduct] = useCreateProductMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    if (value < 0) return;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      inventory: parseInt(formData.inventory, 10),
    };

    try {
      console.log("Submitting product data:", productData);

      const response = await createProduct(productData).unwrap();

      console.log("Product created successfully:", response);

      if (response) {
        toast.success("Product created successfully!");
        navigate("/admin/products");
      }
    } catch (error) {
      console.error("Error creating product:", error);

      if (error.status) {
        toast.error(
          `Error: ${error.status} - ${error.data?.message || error.message}`
        );
      } else {
        toast.error(`Unexpected error: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="px-4 py-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-6">Create Product</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg"
      >
        <div className="space-y-6">
          <div>
            <label
              className="block text-sm font-semibold mb-2"
              htmlFor="categoryId"
            >
              Category ID
            </label>
            <input
              type="text"
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" htmlFor="image">
              Image URL
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" htmlFor="name">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" htmlFor="price">
              Price ($)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleNumberChange}
              required
              min="0"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              className="block text-sm font-semibold mb-2"
              htmlFor="description"
            >
              Product Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div>
            <label
              className="block text-sm font-semibold mb-2"
              htmlFor="inventory"
            >
              Inventory Quantity
            </label>
            <input
              type="number"
              id="inventory"
              name="inventory"
              value={formData.inventory}
              onChange={handleNumberChange}
              required
              min="0"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mt-6 text-center">
            <button
              type="submit"
              disabled={isLoading}
              className={`${
                isLoading ? "bg-gray-400" : "bg-blue-600"
              } text-white py-3 px-6 rounded-md w-full transition-colors duration-200`}
            >
              {isLoading ? "Creating..." : "Create Product"}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}

export default AdminProductCreatePage;
