import { config } from "../../config/environment.js";

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
  return json.data;
};
