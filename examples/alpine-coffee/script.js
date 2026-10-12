// Shared script: check that page-specific controls exist before using them.
const menuButton = document.getElementById('menu-button');
const navigation = document.getElementById('navigation');
menuButton.addEventListener('click', function () {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.focus();
  }
});
const category = document.getElementById('category');
if (category) {
  category.addEventListener('change', function () {
    let count = 0;
    for (const product of document.querySelectorAll('.product')) {
      product.hidden = category.value !== 'all' && product.dataset.category !== category.value;
      if (!product.hidden) count++;
    }
    document.getElementById('product-count').textContent = count + ' items shown';
  });
}
const calculate = document.getElementById('calculate');
if (calculate) {
  calculate.addEventListener('click', function () {
    const quantity = Number(document.getElementById('quantity').value);
    const price = Number(document.getElementById('drink').value);
    const total = document.getElementById('total');
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
      total.textContent = 'Choose a whole quantity from 1 to 20.';
      return;
    }
    total.textContent = 'Illustrative total: €' + (price * quantity).toFixed(2) + '. No order has been placed.';
  });
}
for (const question of document.querySelectorAll('.question')) {
  question.addEventListener('click', function () {
    const answer = document.getElementById(question.getAttribute('aria-controls'));
    answer.hidden = !answer.hidden;
    question.setAttribute('aria-expanded', String(!answer.hidden));
  });
}
