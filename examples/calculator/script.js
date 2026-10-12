const quantity = document.getElementById("quantity");
const total = document.getElementById("total");
document.getElementById("calculate").addEventListener("click", function () {
  const number = Number(quantity.value);
  if (!Number.isInteger(number) || number < 1 || number > 20) {
    total.textContent = "Enter a whole number from 1 to 20.";
    return;
  }
  total.textContent = "Total: €" + (number * 3.5).toFixed(2);
});