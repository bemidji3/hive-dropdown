export const selectedItemText = (selectedItems) => {
  return selectedItems
    .map((item) => {
      return item.text;
    })
    .join(", ");
};
