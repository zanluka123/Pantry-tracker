import { useParams } from "react-router";
import { useProducts } from "../context/PantryContext";
function ProductPage() {
  const { id } = useParams();
  const items = useProducts();
  const item = items.find((item) => item.id === id);

  if (!item) return <p>Item not found</p>;
  return (
    <div>
      {id} {item.name}
    </div>
  );
}

export default ProductPage;
