export function calculateCartTotal(cartItems) {
  return cartItems.reduce(
    (total, item) => {
      const price =
        item.product.discountPrice ||
        item.product.price;

      return (
        total +
        Number(price) * item.quantity
      );
    },
    0
  );
}