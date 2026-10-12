const question = document.getElementById("question");
const answer = document.getElementById("answer");
question.addEventListener("click", function () {
  answer.hidden = !answer.hidden;
  question.setAttribute("aria-expanded", String(!answer.hidden));
});