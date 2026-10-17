// How many days before expiry a product counts as "soon"
const SOON_THRESHOLD_DAYS = 3;

// Milliseconds in one day: 1000 ms × 60 s × 60 min × 24 h
const MS_PER_DAY = 1000 * 60 * 60 * 24;

/**
 * Works out how many full days are left until a product expires.
 * @param {string} expiryDate - The expiry date from the form, e.g. "2026-10-20"
 * @returns {number} Days left. 0 = expires today, negative = already expired
 */
export function getDaysLeft(expiryDate) {
  // Today at midnight, so the current time of day doesn't affect the count
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  // Turn the "YYYY-MM-DD" string into a Date, also at local midnight
  const expiry = new Date(expiryDate);
  expiry.setHours(0, 0, 0, 0);
  // Subtracting two Dates gives the difference in milliseconds
  const diffMs = expiry - today;
  // Convert milliseconds to days. Math.round fixes tiny errors on
  // daylight-saving days, when a "day" is 23 or 25 hours long
  return Math.round(diffMs / MS_PER_DAY);
}
/**
 * Decides the status of a product based on its expiry date.
 *
 * @param {string} expiryDate - The expiry date, e.g. "2026-10-20"
 * @returns {"expired" | "soon" | "ok"}
 *   - "expired": the date has already passed
 *   - "soon": expires today or within the next 3 days
 *   - "ok": more than 3 days left
 */
export function getExpiryStatus(expiryDate) {
  const daysLeft = getDaysLeft(expiryDate);

  if (daysLeft < 0) return "expired";
  if (daysLeft <= SOON_THRESHOLD_DAYS) return "soon";
  return "ok";
}
