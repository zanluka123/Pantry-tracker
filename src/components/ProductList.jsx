import { useProducts } from "../context/PantryContext";
import { useSearchParams } from "react-router";
import ProductCard from "./ProductCard";
import { getDaysLeft, getExpiryStatus } from "../utils/expiry";

function ProductList() {
  const products = useProducts();
  const [searchParams] = useSearchParams();
  const activeFilter = searchParams.get("filter") || "All";
  const filteredProducts = products.filter((product) => {
    const status = getExpiryStatus(product.expiryDate);
    if (activeFilter === "expired") return status === "expired";
    if (activeFilter === "expiring") return status === "soon";
    return "ok";
  });

  const sortedProducts = [...filteredProducts].sort(
    (a, b) => getDaysLeft(a.expiryDate) - getDaysLeft(b.expiryDate),
  );

  if (products.length === 0) {
    return <p>No products in your pantry</p>;
  }

  if (filteredProducts.length === 0) {
    return <p>No products match this filter</p>;
  }

  return (
    <>
      {sortedProducts.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </>
  );
}

export default ProductList;
