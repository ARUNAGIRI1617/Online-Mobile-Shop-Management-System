const mobilePriceElements = document.querySelectorAll(".mobile_price");

let totalPrice = 0;

const listElement = document.querySelectorAll(".mobile li");

const totalPriceElement = document.querySelector("#total_price #price ");

let i = 0;

for (const mobilePriceElement of mobilePriceElements) {
  const mobilePrice = +mobilePriceElement.textContent;
  totalPrice += mobilePrice;
}

totalPriceElement.textContent = totalPrice;
