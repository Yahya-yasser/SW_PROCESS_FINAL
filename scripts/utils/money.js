export function formatCurrency(priceCents) {
  // Convert cents to dollars
  const dollars = priceCents / 100;

  // Format with 2 decimal places and proper comma placement
  return dollars.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default formatCurrency;