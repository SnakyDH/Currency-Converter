import { getCurrencies } from "../services/getCurrencies.js";

export const validateCurrency = async (currency) => {
  if (currency.length === 0) {
    return "La moneda no puede estar vacía";
  }
  if (currency.length > 3) {
    return "La moneda debe tener 3 caracteres o menos";
  }
  const currencies = await getCurrencies();
  const currencyExists = currencies[currency];
  if (!currencyExists) {
    return "La moneda no es valida";
  }

  return "";
};
