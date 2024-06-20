import { config } from "../../config/environment.js";

export const getExchangeRateByBaseCurrency = async (baseCurrency) => {
  const response = await fetch(
    `${config.apiUrl}/latest?base_currency=${baseCurrency}`,
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
