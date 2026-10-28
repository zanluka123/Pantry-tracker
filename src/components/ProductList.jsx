import { useProducts } from "../context/PantryContext";
import { useSearchParams } from "react-router";
import ProductCard from "./ProductCard";
import { getExpiryStatus } from "../utils/expiry";

function ProductList() {
  const products = useProducts();
  const [searchParams] = useSearchParams();
  const activeFilter = searchParams.get("filter") || "all";

  const filteredProducts = products.filter((product) => {
    const status = getExpiryStatus(product.expiryDate); // expired,soon or ok
    if (activeFilter === "expired") return status === "expired";
    if (activeFilter === "expiring") return status === "soon";
    return "ok";
  });

  if (products.length === 0) {
    return <p>No products in your pantry</p>;
  }

  if (filteredProducts.length === 0) {
    return <p>No products match this filter</p>;
  }

  return (
    <>
      {filteredProducts.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </>
  );
}

export default ProductList;
