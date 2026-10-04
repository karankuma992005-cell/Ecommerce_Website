const priceFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export const formatPrice = (amount) => priceFormatter.format(amount);

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

export function getStockStatus(stock) {
  if (stock <= 0) return { label: 'Out of stock', tone: 'danger' };
  if (stock <= 5) return { label: `Only ${stock} left`, tone: 'warn' };
  return { label: 'In stock', tone: 'success' };
}
