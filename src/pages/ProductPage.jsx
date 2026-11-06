import { useParams, useNavigate } from "react-router";
import { useProducts, useProductsDispatch } from "../context/PantryContext";
import { getDaysLeft, getExpiryStatus } from "../utils/expiry";
import styles from "../components/ProductCard.module.css"; // reuse the badge colors
import { useState } from "react";

function ProductPage() {
  const [newDate, setNewDate] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useProductsDispatch();
  const items = useProducts();

  const item = items.find((item) => item.id === id);

  if (!item) return <p>Item not found</p>;

  const status = getExpiryStatus(item.expiryDate);
  const daysLeft = getDaysLeft(item.expiryDate);

  const handleDelete = function () {
    dispatch({ type: "deleteItem", payload: item.id });
    navigate("/");
  };

  const handleNewDate = function () {
    if (!newDate) return;
    dispatch({
      type: "updateDate",
      payload: { id: item.id, expiryDate: newDate },
    });
    setNewDate("");
  };

  return (
    <div>
      <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
      <button onClick={handleNewDate}>Save date</button>
      <button onClick={() => navigate(-1)}>Back</button>
      {item.image && <img src={item.image} alt={item.name} width="200" />}

      <h1>{item.name}</h1>

      {item.brand && <p>{item.brand}</p>}

      <p>Expires {item.expiryDate}</p>
      <span className={`${styles.badge} ${styles[status]}`}>
        {daysLeft < 0 ? "Expired" : `${daysLeft} days left`}
      </span>

      {item.barcode && <p>Barcode: {item.barcode}</p>}

      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default ProductPage;
