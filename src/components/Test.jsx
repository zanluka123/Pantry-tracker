import { useProducts } from "../context/PantryContext";
function Test() {
  const products = useProducts();
  return <p>Products: {products.length}</p>;
}

export default Test;
