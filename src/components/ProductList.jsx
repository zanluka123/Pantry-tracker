import { useProducts } from "../context/PantryContext";
import ProductCard from "./ProductCard";
function ProductList() {
  const products = useProducts();
  const numberOfProducts = products.length;
  return (
    <>
      {numberOfProducts > 0 ? (
        products.map((product) => <ProductCard product={product} key={product.id} />)
      ) : (
        <p>No products in your pantry</p>
      )}
    </>
  );
}

export default ProductList;
