import ProductList from "../components/productList";
import { useProducts } from "../context/PantryContext";

function PantryPage() {
  return (
    <div>
      <h1>Pantry page</h1>
      <ProductList />
    </div>
  );
}

export default PantryPage;
