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
} from "../view/view.js";
import { getCurrencies } from "../model/services/getCurrencies.js";
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
        console.log(currencyError);
        break;
      }
      const exchangeRate = await getExchangeRateByBaseCurrency(currency);
      showExchangeRate(exchangeRate);
      break;
    case "3":
      const baseCurrency = await userCurrency();
      const baseCurrencyError = await validateCurrency(baseCurrency);
      if (baseCurrencyError.length > 0) {
        console.log(baseCurrencyError);
        break;
      }
      const userAmount = await getUserAmount();
      const amountError = validateAmount(userAmount);
      if (amountError.length > 0) {
        console.log(amountError);
        break;
      }
      const targetCurrency = await userTargetCurrency();
      const targetCurrencyError = await validateCurrency(targetCurrency);
      if (targetCurrencyError.length > 0) {
        console.log(targetCurrencyError);
        break;
      }
      const exchangeRateByBaseAndTarget = await getExchangeRateByBaseAndTarget(
        baseCurrency,
        targetCurrency
      );
      if (typeof exchangeRateByBaseAndTarget === "string") {
        showError();
        break;
      }
      const data = {
        baseCurrency,
        baseAmount: userAmount,
        targetCurrency,
        exchangeRateByBaseAndTarget:
          exchangeRateByBaseAndTarget[targetCurrency],
        targetAmount: userAmount * exchangeRateByBaseAndTarget[targetCurrency],
      };
      saveHistory(data);
      showExchangeRate(data);
      break;
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
