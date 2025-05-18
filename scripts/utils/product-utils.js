import { formatCurrency } from './money.js';

export class Product {
  constructor(productData) {
    Object.assign(this, productData);
  }

  getStarsUrl() {
    // Round the rating to the nearest 0.5
    const roundedRating = Math.round(this.rating.stars * 2) / 2;
    // Convert rating to a two-digit string with leading zero if needed
    const ratingString = (roundedRating * 10).toString().padStart(2, '0');
    return `/images/ratings/rating-${ratingString}.png`;
  }

  getPrice() {
    return `$${formatCurrency(this.priceCents)}`;
  }
}

export class ClothingProduct extends Product {
  constructor(productData) {
    super(productData);
  }

  getSizeChartHtml() {
    return this.sizeChartLink ? `
      <a href="${this.sizeChartLink}" target="_blank">Size chart</a>
    ` : '';
  }
}

export function createProduct(productData) {
  if (productData.type === 'clothing') {
    return new ClothingProduct(productData);
  }
  return new Product(productData);
}

export function convertToProductInstances(productsData) {
  return productsData.map(productData => createProduct(productData));
} 