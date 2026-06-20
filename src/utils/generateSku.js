export const generateSku = (
  categoryName,
  count
) => {
  const prefix = categoryName
    .substring(0, 3)
    .toUpperCase();

  return `${prefix}-${String(
    count + 1
  ).padStart(3, "0")}`;
};