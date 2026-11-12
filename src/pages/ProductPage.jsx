import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useProducts, useProductsDispatch } from "../context/PantryContext";
import { getDaysLeft, getExpiryStatus } from "../utils/expiry";
import cardStyles from "../components/ProductCard.module.css";
import styles from "./ProductPage.module.css";

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

  const handleSaveDate = function () {
    if (!newDate) return;
    dispatch({ type: "updateDate", payload: { id: item.id, expiryDate: newDate } });
    setNewDate("");
  };

  return (
    <div className={styles.page}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Back
      </button>

      {item.image && <img className={styles.image} src={item.image} alt={item.name} />}

      <div>
        {item.brand && <p className={styles.brand}>{item.brand}</p>}
        <h1 className={styles.name}>{item.name}</h1>
      </div>

      <div className={`${styles.expiryBox} ${cardStyles[status]}`}>
        <div>
          <p className={styles.expiryLabel}>Expires</p>
          <p className={styles.expiryDate}>{item.expiryDate}</p>
        </div>
        <span className={styles.daysLeft}>
          {daysLeft < 0 ? "Expired" : daysLeft === 0 ? "Today" : `${daysLeft} days left`}
        </span>
      </div>

      <div className={styles.changeDate}>
        <input
          className={styles.input}
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        />
        <button className={styles.secondaryButton} onClick={handleSaveDate}>
          Save date
        </button>
      </div>

      {item.barcode && <p className={styles.barcode}>Barcode: {item.barcode}</p>}

      <button className={styles.deleteButton} onClick={handleDelete}>
        Delete product
      </button>
    </div>
  );
}

export default ProductPage;
