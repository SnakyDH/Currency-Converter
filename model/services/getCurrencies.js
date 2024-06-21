import { config } from "../../config/environment.js";

export let validCurrencies = [];

export const getCurrencies = async () => {
  const response = await fetch(`${config.apiUrl}/currencies`, {
    headers: {
      apiKey: config.apiKey,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch currencies");
  }
  const json = await response.json();
  validCurrencies = Object.keys(json.data);
  return json.data;
};
