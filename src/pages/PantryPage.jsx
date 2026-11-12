import ProductList from "../components/ProductList";
import FilterButtons from "../components/FilterButtons";
import PantrySummary from "../components/PantrySummary";

function PantryPage() {
  return (
    <div>
      <h1>Pantry page</h1>
      <p>
        {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
      </p>
      <h1>My pantry</h1>
      <PantrySummary />
      <FilterButtons />
      <ProductList />
    </div>
  );
}

export default PantryPage;
