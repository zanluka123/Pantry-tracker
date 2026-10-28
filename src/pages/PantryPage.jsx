import ProductList from "../components/productList";
import FilterButtons from "../components/FilterButtons";
import PantrySummary from "../components/PantrySummary";

function PantryPage() {
  return (
    <div>
      <h1>Pantry page</h1>
      <PantrySummary />
      <FilterButtons />
      <ProductList />
    </div>
  );
}

export default PantryPage;
