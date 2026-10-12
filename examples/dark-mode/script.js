const button = document.getElementById("theme");
button.addEventListener("click", function () {
  const isDark = document.body.classList.toggle("dark");
  button.setAttribute("aria-pressed", String(isDark));
});