const loader = document.querySelector(".loader");
const screen1 = document.querySelector(".screen-1");
const screen2 = document.querySelector(".screen-2");
const cover = document.querySelector(".cover");
const quiz = document.querySelector(".quiz");
const quizOptions = document.querySelector(".quizOptions");
const scoreCount = document.querySelector("#scoreCount");
const playBtn = document.getElementById("playBtn");
let currentQuestion = 0;
let score = 0;
const mydata = [
  {
    id: 0,
    question:
      "Relcer has ___________component which ensures anti inflammatory actions leading to mucosal healing.",
    option: [
      "Aluminium hydroxide",
      "Deglycyrrhizinated Liquorice",
      "Magnesium Hydroxide",
    ],
    correct: "Deglycyrrhizinated Liquorice",
  },
  {
    id: 1,
    question: "______ in Relcer helps in faster elimination of Gas.",
    option: ["Simethicone", "Deglycyrrhizinated Liquorice"],
    correct: "Simethicone",
  },
  {
    id: 2,
    question: "Relcer bans the burn in stomach and ensures freedom from",
    option: ["Bloating", "Burping", "Flatulence", "All of the above"],
    correct: "All of the above",
  },
  {
    id: 3,
    question: "Which of the following is not a feature of Relcer",
    option: [
      "Long shelf Life (4yrs)",
      "Very stable suspension",
      "Fast acid neutralization",
      "Comes in a Glass bottle",
    ],
    correct: "Comes in a Glass bottle",
  },
  {
    id: 4,
    question:
      "Relcer ensures – Rapid Relief, Reflux prevention and Rebuilds lining.",
    option: ["True", "False"],
    correct: "True",
  },
];
window.addEventListener("load", (event) => {
  loader.remove();
  screen1.classList.add("active");
  setTimeout(() => {
    document.querySelectorAll(".old").forEach((item) => {
      item.classList.remove("active");
    });
    document.querySelectorAll(".new").forEach((item) => {
      item.classList.add("active");
      setTimeout(() => {
        document.querySelector(".playUnit").classList.add("active");
      }, 1000);
    });
  }, 2000);
});

playBtn.addEventListener("click", () => {
  document.querySelector(".revealBlock").classList.add("show");
  setTimeout(() => {
    screen1.classList.remove("active");
    screen2.classList.add("active");
    mytimer();
  }, 200);
  cover.classList.add("active");
});
const yellowPatch = document.getElementById("yellowPatch");

function mytimer() {
  let count = 60;
  timer = setInterval(function () {
    document.getElementById("timerCount").textContent = count--;
    if (count == 1) clearInterval(timer);
  }, 1000);
}

function startQuiz() {
  let newQuestion;
  function quiz() {
    scoreCount.textContent = `${score}/${mydata.length}`;
    if (currentQuestion <= mydata.length - 1) {
      newQuestion = mydata[currentQuestion].question;
      yellowPatch.innerHTML = `<span>${newQuestion}</span>
                <img src="images/yellowPatch.png" />`;
      let newOptions = [];
      mydata[currentQuestion].option.forEach((item) => {
        newOptions.push(
          `<button class='option' data-option='${item}'><span>${item}</span><img src='images/bluePatch.png'></button>`
        );
      });
      quizOptions.innerHTML = newOptions.join("");
    } else {
      console.log("game over");
      clearInterval(timer);
    }
    document.querySelectorAll(".option").forEach((item) => {
      item.addEventListener("click", () => {
        if (currentQuestion <= mydata.length - 1) {
          if (
            item.getAttribute("data-option") === mydata[currentQuestion].correct
          ) {
            score = score + 1;
            console.log("correct ans");
            scoreCount.textContent = `${score}/${mydata.length}`;
          } else {
            console.log("wrong ans");
            scoreCount.textContent = `${score}/${mydata.length}`;
          }
          currentQuestion = currentQuestion + 1;
          console.log(score, currentQuestion);
          quiz();
        }
      });
    });
  }
  quiz();
}
startQuiz();
