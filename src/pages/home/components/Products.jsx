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
  } = useGetProductsQuery();

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useGetCategoriesQuery();

  const [selectedCategoryId, setSelectedCategoryId] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("NONE");

  const filteredProducts =
    selectedCategoryId === "ALL"
      ? products
      : products.filter((product) => product.categoryId === selectedCategoryId);

  const sortedProducts = () => {
    const productsToSort = [...filteredProducts];
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
    return productsToSort;
  };

  const handleTabClick = (_id) => setSelectedCategoryId(_id);
  const handleSortLowToHigh = () => setSortOrder("LOW_TO_HIGH");
  const handleSortHighToLow = () => setSortOrder("HIGH_TO_LOW");

  // Loading State
  if (isProductsLoading || isCategoriesLoading) {
    return (
      <section className="px-4 py-6 sm:px-6 md:px-8">
        <h2 className="text-2xl md:text-4xl font-bold">Our Top Books</h2>
        <Separator className="mt-2" />
        <div className="mt-4 flex flex-wrap gap-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
        </div>
      </section>
    );
  }

  // Error State
  if (isProductsError || isCategoriesError) {
    return (
      <section className="px-4 py-6 sm:px-6 md:px-8">
        <h2 className="text-2xl md:text-4xl font-bold">Our Top Books</h2>
        <Separator className="mt-2" />
        <p className="mt-4 text-red-500">Error fetching books or categories</p>
      </section>
    );
  }

  return (
    <section className="px-4 py-6 sm:px-6 md:px-8">
      <h2 className="text-2xl md:text-4xl font-bold">Our Top Books</h2>
      <Separator className="mt-2" />

      {/* Tabs */}
      <div className="mt-4 w-full overflow-x-auto">
        <div className="flex w-max gap-2 sm:gap-4 px-2 pb-2">
          {categories.map((category) => (
            <Tab
              key={category._id}
              _id={category._id}
              selectedCategoryId={selectedCategoryId}
              name={category.name}
              onTabClick={handleTabClick}
            />
          ))}
        </div>
      </div>

      {/* Sort Buttons */}
      <div className="flex flex-col sm:flex-row mt-4 gap-2">
        <Button
          variant={sortOrder === "LOW_TO_HIGH" ? "default" : "outline"}
          onClick={handleSortLowToHigh}
        >
          Sort by price: Ascending
        </Button>
        <Button
          variant={sortOrder === "HIGH_TO_LOW" ? "default" : "outline"}
          onClick={handleSortHighToLow}
        >
          Sort by price: Descending
        </Button>
      </div>

      {/* Product Grid */}
      <div className="mt-6">
        <ProductCards products={sortedProducts()} />
      </div>
    </section>
  );
}

export default Products;
