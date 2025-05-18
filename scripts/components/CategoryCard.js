export function renderCategoryCard(category) {
  return `
    <div class="category-card" data-category-id="${category.id}">
      <h3>${category.name}</h3>
      <p>${category.description}</p>
    </div>
  `;
} 