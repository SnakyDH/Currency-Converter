export const validateAmount = (amount) => {
  if (amount <= 0) {
    return "El monto debe ser mayor a 0";
  }
  if (amount > 1000000000) {
    return "El monto debe ser menor a 1000000000";
  }

  return "";
};
