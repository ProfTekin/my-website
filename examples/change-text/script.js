const button = document.getElementById("welcome-button");
const heading = document.getElementById("welcome");
button.addEventListener("click", function () {
  heading.textContent = "Welcome to Alpine Coffee!";
});