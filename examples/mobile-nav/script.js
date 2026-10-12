const button = document.getElementById("menu-button");
const links = document.getElementById("links");
button.addEventListener("click", function () {
  const open = links.classList.toggle("open");
  button.setAttribute("aria-expanded", String(open));
});
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    links.classList.remove("open");
    button.setAttribute("aria-expanded", "false");
    button.focus();
  }
});