const category = document.getElementById("category");
const products = document.querySelectorAll(".product");
category.addEventListener("change", function () {
  let count = 0;
  for (const product of products) {
    product.hidden = category.value !== "all" &&
      product.dataset.category !== category.value;
    if (!product.hidden) count++;
  }
  document.getElementById("count").textContent = count + " products shown";
});