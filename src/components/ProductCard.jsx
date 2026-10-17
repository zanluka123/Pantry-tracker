import { useProductsDispatch } from "../context/PantryContext";
import { getDaysLeft, getExpiryStatus } from "../utils/expiry";
import styles from "./ProductCard.module.css";

function ProductCard({ product }) {
  const status = getExpiryStatus(product.expiryDate);
  const daysLeft = getDaysLeft(product.expiryDate);
  const dispatch = useProductsDispatch();

  let label;
  if (status === "expired") label = "Expired";
  else if (daysLeft === 0) label = "Expires today";
  else if (daysLeft === 1) label = "1 day left";
  else label = `${daysLeft} days left`;

  return (
    // Two children: .info on the left, .actions on the right
    <div className={styles.card}>
      <div className={styles.info}>
        <h2 className={styles.name}>{product.name}</h2>
        {product.brand && <p className={styles.details}>{product.brand}</p>}
        <p className={styles.details}>Expires {product.expiryDate}</p>
      </div>

      <div className={styles.actions}>
        <span className={`${styles.badge} ${styles[status]}`}>{label}</span>
        <button
          className={styles.deleteButton}
          onClick={() => dispatch({ type: "deleteItem", payload: product.id })}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
