// A product counts as "soon" if it expires in 3 days or less
const SOON_DAYS = 3;

// How many milliseconds are in one day (JS measures time in ms)
const ONE_DAY_MS = 1000 * 60 * 60 * 24;

// Returns how many days are left until the expiry date
// 3 = three days left, 0 = expires today, -2 = expired 2 days ago
export function getDaysLeft(expiryDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // set to midnight, so the time of day doesn't matter

  const expiry = new Date(expiryDate);
  expiry.setHours(0, 0, 0, 0);

  const difference = expiry - today; // difference in milliseconds
  return Math.round(difference / ONE_DAY_MS); // convert to days
}

// Returns the status for the badge color: "expired", "soon" or "ok"
export function getExpiryStatus(expiryDate) {
  const daysLeft = getDaysLeft(expiryDate);

  if (daysLeft < 0) return "expired";
  if (daysLeft <= SOON_DAYS) return "soon";
  return "ok";
}
