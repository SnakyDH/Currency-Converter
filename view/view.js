import { createInterface } from "readline";

export const menu = () => {
  return new Promise((resolve) => {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    console.log("======================");
    console.log("Convertidor de Divisas");
    console.log("======================");
    console.log("Seleccione una opción:");
    console.log("1. Mostrar lista de monedas");
    console.log("2. Mostrar tasa de cambio de una moneda");
    console.log("3. Convertir una cantidad de una moneda a otra");
    console.log("4: Historial de conversiones");
    console.log("0. Salir");

    rl.question("Seleccioné una opción:", (answer) => {
      resolve(answer);
      rl.close();
    });
  });
};

export const pause = () => {
  return new Promise((resolve) => {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(`Presione Enter para continuar`, () => {
      resolve();
      rl.close();
    });
  });
};

export const userCurrency = () => {
  return new Promise((resolve) => {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question("Ingrese la moneda base:", (answer) => {
      resolve(answer);
      rl.close();
    });
  });
};

export const getUserAmount = () => {
  return new Promise((resolve) => {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question("Ingrese la cantidad:", (answer) => {
      resolve(answer);
      rl.close();
    });
  });
};

export const userTargetCurrency = () => {
  return new Promise((resolve) => {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question("Ingrese la moneda objetivo:", (answer) => {
      resolve(answer);
      rl.close();
    });
  });
};

export const showCurrencies = (currencies) => {
  console.table(currencies);
};

export const showExchangeRate = (exchangeRate) => {
  console.table(exchangeRate);
};

export const showExchangeRateByBaseAndTarget = (data) => {
  console.table(data);
};

export const showHistory = (history) => {
  console.table(history);
};

export const showOptionInvalid = () => {
  console.log("Opción inválida");
};

export const showGoodbye = () => {
  console.log("Gracias por usar el convertidor de divisas");
  console.log("Hasta luego!");
};

export const showError = () => {
  console.error("La operación falló");
};
