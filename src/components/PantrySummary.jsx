import { useProducts } from "../context/PantryContext";
import { getExpiryStatus } from "../utils/expiry";

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
    <div>
      <p>Expired items : {expiredCount}</p>
      <p>Soon expired : {soonExpiredCount} </p>
      <p>Total items in pantry :{items.length} </p>
    </div>
  );
}

export default PantrySummary;
