import { useProductsDispatch } from "../context/PantryContext";
import { getDaysLeft, getExpiryStatus } from "../utils/expiry";
import styles from "./ProductCard.module.css";
import { Link } from "react-router";

function ProductCard({ product }) {
  const status = getExpiryStatus(product.expiryDate); // return soon , ok , expired
  const daysLeft = getDaysLeft(product.expiryDate); // return a number how many days before it expired
  const dispatch = useProductsDispatch();

  let label;
  const months = Math.floor(daysLeft / 30);
  const years = Math.floor(daysLeft / 365);
  if (status === "expired") label = "Expired";
  else if (daysLeft === 0) label = "Expires today";
  else if (daysLeft === 1) label = "1 day left";
  else if (daysLeft >= 365) label = `${years} ${years === 1 ? "year" : "years"} left`;
  else if (daysLeft > 30) label = `${months} ${months === 1 ? "month" : "months"} left `;
  else label = `${daysLeft} days left`;

  return (
    <Link to={`/item/${product.id}`} className={styles.card}>
      {product.image && <img className={styles.cardimage} src={product.image} alt={product.name} />}
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
    </Link>
  );
}

export default ProductCard;
