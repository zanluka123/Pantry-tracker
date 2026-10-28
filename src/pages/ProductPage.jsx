import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { useProducts, useProductsDispatch } from "../context/PantryContext";
function ProductPage() {
  const dispatch = useProductsDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const items = useProducts();
  const item = items.find((item) => item.id === id);

  const handleDelete = function () {
    dispatch({ type: "deleteItem", payload: item.id });
    navigate("/");
  };

  if (!item) return <p>Item not found</p>;
  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      <button onClick={handleDelete}>Delete</button>
      {id} {item.name}
    </div>
  );
}

export default ProductPage;
