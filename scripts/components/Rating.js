export function renderRating(rating) {
  const roundedRating = Math.round(rating.stars * 2) / 2;
  const ratingString = (roundedRating * 10).toString().padStart(2, '0');

  return `
    <div class="product-rating-container">
      <img class="product-rating-stars"
        src="/images/ratings/rating-${ratingString}.png">
      <div class="product-rating-count link-primary">
        ${rating.count}
      </div>
    </div>
  `;
} 