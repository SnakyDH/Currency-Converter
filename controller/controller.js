import {
  menu,
  pause,
  showCurrencies,
  showExchangeRate,
  showGoodbye,
  userCurrency,
  getUserAmount,
  userTargetCurrency,
  showHistory,
  showOptionInvalid,
  showError,
  showValidCurrencies,
} from "../view/view.js";
import {
  getCurrencies,
  validCurrencies,
} from "../model/services/getCurrencies.js";
import { getExchangeRateByBaseCurrency } from "../model/services/getExchangeRate.js";
import { getExchangeRateByBaseAndTarget } from "../model/services/getExchangeRateByBaseAndTarget.js";
import { history, saveHistory } from "../model/services/saveHistory.js";
import { validateAmount } from "../model/validator/validateAmount.js";
import { validateCurrency } from "../model/validator/validateCurrency.js";

export const controller = async () => {
  let opt = "";
  do {
    opt = await menu();
    await evaluateOption(opt);
    await pause();
  } while (opt !== "0");
};

const evaluateOption = async (option) => {
  switch (option) {
    case "1":
      const currencies = await getCurrencies();
      showCurrencies(currencies);
      break;
    case "2":
      const currency = await userCurrency();
      const currencyError = await validateCurrency(currency);
      if (currencyError.length > 0) {
        showError(currencyError);
        if (currencyError === "La moneda no es valida") {
          showValidCurrencies(validCurrencies);
        }
        break;
      }
      const exchangeRate = await getExchangeRateByBaseCurrency(currency);
      showExchangeRate(exchangeRate);
      break;
    case "3":
      const baseCurrency = await userCurrency();
      const baseCurrencyError = await validateCurrency(baseCurrency);
      if (baseCurrencyError.length > 0) {
        showError(baseCurrencyError);
        if (baseCurrencyError === "La moneda no es valida") {
          showValidCurrencies(validCurrencies);
        }
        break;
      }
      try {
        const userAmount = await getUserAmount();
        const amountError = validateAmount(userAmount);
        if (amountError.length > 0) {
          if (amountError === "La cantidad no puede estar vacía") {
            showError(amountError);
            break;
          }
          showError(amountError);
        }

        const targetCurrency = await userTargetCurrency();
        const targetCurrencyError = await validateCurrency(targetCurrency);
        if (targetCurrencyError.length > 0) {
          showError(targetCurrencyError);
          if (targetCurrencyError === "La moneda no es valida") {
            showValidCurrencies(validCurrencies);
          }
          break;
        }
        const exchangeRateByBaseAndTarget =
          await getExchangeRateByBaseAndTarget(baseCurrency, targetCurrency);
        if (typeof exchangeRateByBaseAndTarget === "string") {
          showError();
          break;
        }
        const data = {
          "Moneda Base": baseCurrency,
          "Cantidad en Moneda Base": userAmount,
          "Moneda Objetivo": targetCurrency,
          "Tasa de Cambio": exchangeRateByBaseAndTarget[targetCurrency],
          "Cantidad en Moneda Objetivo":
            userAmount * exchangeRateByBaseAndTarget[targetCurrency],
        };
        saveHistory(data);
        showExchangeRate(data);
        break;
      } catch (error) {
        showError("La cantidad debe ser un número");
        break;
      }
    case "4":
      showHistory(history);
      break;
    case "0":
      showGoodbye();
      process.exit(0);
      break;
    default:
      showOptionInvalid();
      break;
  }
};
