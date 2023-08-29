document.addEventListener("DOMContentLoaded", () => {
  const celsiusInput = document.querySelector("#celsius > input");
  const fahrenheitInput = document.querySelector("#fahrenheit > input");
  const kelvinInput = document.querySelector("#kelvin > input");

  const roundToTwoDP = (num) => {
    return num.toFixed(2);
  };

  const checkAbsoluteZero = (kelvinTemp) => {
    if (kelvinTemp === 0) {
      return "Vous êtes au zéro absolu !";
    } else {
      return "";
    }
  };

  const updateResults = (celsiusTemp, fahrenheitTemp, kelvinTemp) => {
    const celsiusResult = roundToTwoDP(celsiusTemp) + " °C";
    const fahrenheitResult = roundToTwoDP(fahrenheitTemp) + " °F";
    const kelvinResult = roundToTwoDP(kelvinTemp) + " K";

    document.getElementById("celsius-result").textContent = celsiusResult;
    document.getElementById("fahrenheit-result").textContent = fahrenheitResult;
    document.getElementById("kelvin-result").textContent = kelvinResult;

    const absoluteZeroMessage = checkAbsoluteZero(kelvinTemp);
    document.getElementById("absolute-zero-message").textContent =
      absoluteZeroMessage;
  };

  const celsiusToFaAndKe = () => {
    const celsiusTemp = parseFloat(celsiusInput.value);
    const fahrenheitTemp = celsiusTemp * 1.8 + 32;
    const kelvinTemp = celsiusTemp + 273.15;

    fahrenheitInput.value = roundToTwoDP(fahrenheitTemp);
    kelvinInput.value = roundToTwoDP(kelvinTemp);

    updateResults(celsiusTemp, fahrenheitTemp, kelvinTemp);
  };

  const fahrenheitToCeAndKe = () => {
    const fahrenheitTemp = parseFloat(fahrenheitInput.value);
    const celsiusTemp = (fahrenheitTemp - 32) * (5 / 9);
    const kelvinTemp = (fahrenheitTemp + 459.67) * (5 / 9);

    celsiusInput.value = roundToTwoDP(celsiusTemp);
    kelvinInput.value = roundToTwoDP(kelvinTemp);

    updateResults(celsiusTemp, fahrenheitTemp, kelvinTemp);
  };

  const kelvinToCeAndFa = () => {
    const kelvinTemp = parseFloat(kelvinInput.value);
    const celsiusTemp = kelvinTemp - 273.15;
    const fahrenheitTemp = (kelvinTemp - 273.15) * 1.8 + 32;

    celsiusInput.value = roundToTwoDP(celsiusTemp);
    fahrenheitInput.value = roundToTwoDP(fahrenheitTemp);

    updateResults(celsiusTemp, fahrenheitTemp, kelvinTemp);
  };

  celsiusInput.addEventListener("input", () => {
    celsiusToFaAndKe();
  });

  fahrenheitInput.addEventListener("input", () => {
    fahrenheitToCeAndKe();
  });

  kelvinInput.addEventListener("input", () => {
    kelvinToCeAndFa();
  });

  updateResults(0, 0, 0);
});
