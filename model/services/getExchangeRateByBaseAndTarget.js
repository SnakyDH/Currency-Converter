import { config } from "../../config/environment.js";

export const getExchangeRateByBaseAndTarget = async (
  baseCurrency,
  targetCurrency
) => {
  const response = await fetch(
    `${config.apiUrl}/latest?base_currency=${baseCurrency}&currencies=${targetCurrency}`,
    {
      headers: {
        apiKey: config.apiKey,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch exchange rate by base currency");
  }
  const json = await response.json();
  return json.data;
};
