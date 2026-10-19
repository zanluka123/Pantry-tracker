import ProductList from "../components/productList";
import FilterButtons from "../components/FilterButtons";

function PantryPage() {
  return (
    <div>
      <h1>Pantry page</h1>
      <FilterButtons />
      <ProductList />
    </div>
  );
}

export default PantryPage;
