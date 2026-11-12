import { useProducts } from "../context/PantryContext";
import { getExpiryStatus } from "../utils/expiry";
import styles from "./PantrySummary.module.css";

function PantrySummary() {
  const items = useProducts();

  const expiredItems = items.filter((item) => {
    const status = getExpiryStatus(item.expiryDate);
    return status === "expired";
  });
  const expiredCount = expiredItems.length;

  const soonExpiredItems = items.filter((item) => {
    const status = getExpiryStatus(item.expiryDate);
    return status === "soon";
  });

  const soonExpiredCount = soonExpiredItems.length;

  return (
    <div className={styles.grid}>
      <div className={`${styles.box} ${styles.expired}`}>
        <span className={styles.number}>{expiredCount}</span>
        <span className={styles.label}>Expired</span>
      </div>
      <div className={`${styles.box} ${styles.soon}`}>
        <span className={styles.number}>{soonExpiredCount}</span>
        <span className={styles.label}>Expiring soon</span>
      </div>
      <div className={`${styles.box} ${styles.total}`}>
        <span className={styles.number}>{items.length}</span>
        <span className={styles.label}>Total</span>
      </div>
    </div>
  );
}

export default PantrySummary;
