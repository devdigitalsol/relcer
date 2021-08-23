window.onload = function () {
  let imgs = [];
  let imgUrls = [
    "images/gif-screens/initial-stage.gif",
    "images/gif-screens/correct1.gif",
    "images/gif-screens/correct2.gif",
    "images/gif-screens/correct3.gif",
    "images/gif-screens/correct4.gif",
    "images/gif-screens/correct5.gif",
  ];

  var tiktok = new Audio("sound/tiktok.mp3");
  tiktok.loop = true;

  for (let i = 0; i < imgUrls.length; i++) {
    imgs.push(new Image());
    imgs[i].src = imgUrls[i];
  }
  const replaybtn = document.getElementById("replaybtn");
  replaybtn.addEventListener("click", () => {
    location.reload();
  });
  const questionContainer = document.querySelector("#questionContainer");
  const questionCount = document.querySelector("#questionCount");
  const gifScreen = document.querySelector(".gifScreen");
  const loader = document.querySelector(".loader");
  const screen1 = document.querySelector(".screen-1");
  const screen2 = document.querySelector(".screen-2");
  const screen3 = document.querySelector(".screen-3");
  const cover = document.querySelector(".cover");
  let timebgpos = 0;
  // const quiz = document.querySelector(".quiz");
  const quizOptions = document.querySelector(".quizOptions");
  const scoreCount = document.querySelectorAll(".scoreCount");
  const playBtn = document.getElementById("playBtn");
  let currentQuestion = 0;
  let score = 0;
  let correct = false;
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

  playBtn.addEventListener("click", () => {
    document.querySelector(".revealBlock").classList.add("show");
    startQuiz();
    setTimeout(() => {
      screen1.classList.remove("active");
      screen2.classList.add("active");
    }, 200);
  });

  function mytimer() {
    tiktok.play();
    let count = 60;
    let sec = 0;
    document.querySelector(".revealBlock").classList.remove("show");
    timer = setInterval(function () {
      sec = sec + 1;
      document.getElementById("timerCount").textContent = count--;
      if (sec % 5 === 0) {
        timebgpos = timebgpos + 29;
        document.getElementById("timerCount").style.backgroundPositionX =
          -timebgpos + "px";
      }
      if (count < 0) {
        finish();
      }
    }, 1000);
  }

  function startQuiz() {
    mytimer();
    let newQuestion;
    function quiz() {
      scoreCount.forEach((sc) => {
        sc.textContent = `${score}/${mydata.length}`;
      });
      questionCount.innerHTML = currentQuestion + 1;

      if (currentQuestion <= mydata.length - 1) {
        newQuestion = mydata[currentQuestion].question;
        questionContainer.innerHTML = `<span>${newQuestion}</span>`;
        let newOptions = [];
        mydata[currentQuestion].option.forEach((item) => {
          newOptions.push(
            `<button class='option' data-option='${item}'><span>${item}</span></button>`
          );
        });
        quizOptions.innerHTML = newOptions.join("");
      } else {
        console.log("game over");
        finish();
      }
      document.querySelectorAll(".option").forEach((item) => {
        item.addEventListener("click", () => {
          document.querySelectorAll(".option").forEach((elem) => {
            elem.disabled = true;
            if (
              elem.getAttribute("data-option") ===
              mydata[currentQuestion].correct
            ) {
              elem.classList.add("correctAns");
            }
          });
          if (currentQuestion <= mydata.length - 1) {
            if (
              item.getAttribute("data-option") ===
              mydata[currentQuestion].correct
            ) {
              score = score + 1;

              console.log("correct ans");
              scoreCount.textContent = `${score}/${mydata.length}`;
              correct = true;
            } else {
              item.classList.add("wrongAns");

              console.log("wrong ans");
              scoreCount.textContent = `${score}/${mydata.length}`;
              correct = false;
            }
          }
          checkCorrect();
          setTimeout(() => {
            currentQuestion = currentQuestion + 1;
            quiz();
          }, 4000);
        });
      });
    }
    console.log(currentQuestion);
    quiz();
  }

  function checkCorrect() {
    if (correct) {
      cover.classList.add("active");
      console.log(currentQuestion);
      if (currentQuestion === 0) {
        gifScreen.removeChild(document.querySelector(".imgGif"));
        gifScreen.appendChild(imgs[1]).classList.add("imgGif");
      } else if (currentQuestion === 1) {
        gifScreen.removeChild(document.querySelector(".imgGif"));
        gifScreen.appendChild(imgs[2]).classList.add("imgGif");
      } else if (currentQuestion === 2) {
        gifScreen.removeChild(document.querySelector(".imgGif"));
        gifScreen.appendChild(imgs[3]).classList.add("imgGif");
      } else if (currentQuestion === 3) {
        gifScreen.removeChild(document.querySelector(".imgGif"));
        gifScreen.appendChild(imgs[4]).classList.add("imgGif");
      } else {
        gifScreen.removeChild(document.querySelector(".imgGif"));
        gifScreen.appendChild(imgs[5]).classList.add("imgGif");
      }
    }
  }
  function finish() {
    tiktok.pause();
    clearInterval(timer);
    document.querySelector(".revealBlock").classList.add("show");
    screen2.classList.remove("active");
    screen3.classList.add("active");
  }
};
