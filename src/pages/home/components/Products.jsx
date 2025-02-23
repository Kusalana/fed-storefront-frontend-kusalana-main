import { Separator } from "@/components/ui/separator";
import { useGetCategoriesQuery, useGetProductsQuery } from "@/lib/api";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCards from "./ProductCards";
import Tab from "./Tab";
import { Button } from "@/components/ui/button";

function Products() {
  const {
    data: products,
    isLoading: isProductsLoading,
    isError: isProductsError,
    error: productsError,
  } = useGetProductsQuery();

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
    error: categoriesError,
  } = useGetCategoriesQuery();

 

  const [selectedCategoryId, setSelectedCategoryId] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("NONE");

  const filteredProducts =
    selectedCategoryId === "ALL"
      ? products
      : products.filter((product) => product.categoryId === selectedCategoryId);
      console.log(products);
      const sortedProducts = () => {
        const productsToSort = [...filteredProducts]; // This creates a shallow copy of filteredProducts
      
        if (sortOrder === "LOW_TO_HIGH") {
          return productsToSort.sort(
            (a, b) => parseFloat(a.price) - parseFloat(b.price)
          );
        }
        if (sortOrder === "HIGH_TO_LOW") {
          return productsToSort.sort(
            (a, b) => parseFloat(b.price) - parseFloat(a.price)
          );
        }
        return productsToSort; // Return the copied array, which is not mutated
      };
      

  const handleTabClick = (_id) => {
    setSelectedCategoryId(_id);
  };

  const handleSortLowToHigh = () => {
    setSortOrder("LOW_TO_HIGH");
  };

  const handleSortHighToLow = () => {
    setSortOrder("HIGH_TO_LOW");
  };
  //  Loading state
  if (isProductsLoading || isCategoriesLoading) {
    return (
      <section className="px-8 py-8">
        <h2 className="text-4xl font-bold">Our Top Products</h2>
        <Separator className="mt-2" />
        <div className="mt-4 flex items-center gap-4">
          <Skeleton className="h-16" />
        </div>
        <div className="grid grid-cols-4 gap-4 mt-4">
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
        </div>
      </section>
    );
  }

  // Error handling
  if (isProductsError || isCategoriesError) {
    return (
      <section className="px-8 py-8">
        <h2 className="text-4xl font-bold">Our Top Products</h2>
        <Separator className="mt-2" />
        <div className="mt-4">
          <p className="text-red-500">{`Error fetching products or categories`}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-8 py-8">
    <h2 className="text-4xl font-bold">Our Top Products</h2>
    <Separator className="mt-2" />
    <div className="mt-4 flex items-center gap-4">
      {categories.map((category) => (
        <Tab
          key={category._id}
          _id={category._id}
          selectedCategoryId={selectedCategoryId}
          name={category.name}
          onTabClick={handleTabClick}
        />
      ))}{" "}
    </div>

    <div className="flex mt-4 gap-2">
      <Button  onClick={handleSortLowToHigh}>Sort by price: Ascending</Button>
      <Button  onClick={handleSortHighToLow}>Sort by price: Descending</Button>
    </div>
    <ProductCards products={sortedProducts()} />
  </section>
);
}


export default Products;
