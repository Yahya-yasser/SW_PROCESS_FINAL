export const deliveryOptions = [
  {
  id: '1',
  deliveryDays: 7,
    priceCents: 0,
    label: 'FREE Shipping'
  },
  {
  id: '2',
  deliveryDays: 3,
    priceCents: 499,
    label: 'Express Shipping'
  },
  {
  id: '3',
  deliveryDays: 1,
    priceCents: 999,
    label: 'Next Day Delivery'
  }
];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  return deliveryOption;
}