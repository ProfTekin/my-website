const images = [
  {src: "../../images/coffee.svg", alt: "A steaming coffee cup", name: "Coffee"},
  {src: "../../images/mountains.svg", alt: "Layers of Alpine peaks", name: "Mountains"},
  {src: "../../images/pastry.svg", alt: "A golden croissant", name: "Pastry"}
];
let index = 0;
const photo = document.getElementById("photo");
const caption = document.getElementById("caption");
document.getElementById("next").addEventListener("click", function () {
  index = (index + 1) % images.length;
  photo.src = images[index].src;
  photo.alt = images[index].alt;
  caption.textContent = images[index].name + " · " + (index + 1) + " of 3";
});