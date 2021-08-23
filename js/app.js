window.onload = function () {
  const loader = document.querySelector(".loader");
  let docimgs = document.images,
    len = docimgs.length,
    counter = 0;

  [].forEach.call(docimgs, function (img) {
    if (img.complete) incrementCounter();
    else img.addEventListener("load", incrementCounter, false);
  });

  function incrementCounter() {
    counter++;
    if (counter === len) {
      loader.remove();
      console.log("All images loaded!");
    }
  }
  let imgs = [];
  let imgUrls = [
    "images/gif-screens/initial-stage.gif?" + Math.random(),
    "images/gif-screens/correct1.gif?" + Math.random(),
    "images/gif-screens/correct2.gif?" + Math.random(),
    "images/gif-screens/correct3.gif?" + Math.random(),
    "images/gif-screens/correct4.gif?" + Math.random(),
    "images/gif-screens/correct5.gif?" + Math.random(),
  ];

  let tiktok = new Audio("sound/tiktok.mp3");
  let touchClick = new Audio("sound/click.mp3");
  let water = new Audio("sound/water.mp3");
  let wrong = new Audio("sound/wrong.mp3");
  let clap = new Audio("sound/clap.mp3");
  let gamesound = new Audio("sound/gamesound.mp3");
  gamesound.volume = 0.5;

  tiktok.loop = true;

  for (let i = 0; i < imgUrls.length; i++) {
    imgs.push(new Image());
    imgs[i].src = imgUrls[i];
  }
  console.log(imgs);

  const replaybtn = document.getElementById("replaybtn");
  replaybtn.addEventListener("click", () => {
    location.reload();
  });
  const questionContainer = document.querySelector("#questionContainer");
  const questionCount = document.querySelector("#questionCount");
  const gifScreen = document.querySelector(".gifScreen");

  const screen1 = document.querySelector(".screen-1");
  const screen2 = document.querySelector(".screen-2");
  const screen3 = document.querySelector(".screen-3");
  const ok = document.querySelector(".ok");
  const timeup = document.querySelector(".timeup");
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
      option: ["Simethicone", "Deglycyrrhizinated Liquorice", "", ""],
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
      option: ["True", "False", "", ""],
      correct: "True",
    },
  ];

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
    // document.querySelector(".revealBlock").classList.remove("show");
    timer = setInterval(function () {
      sec = sec + 1;
      document.getElementById("timerCount").textContent = count--;
      if (sec % 5 === 0) {
        timebgpos = timebgpos + 29;
        document.getElementById("timerCount").style.backgroundPositionX =
          -timebgpos + "px";
      }
      if (count < 0) {
        timeup.classList.add("show");
        ok.addEventListener("click", function () {
          finish();
        });
      }
    }, 1000);
  }

  function startQuiz() {
    gamesound.play();
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
        document.querySelectorAll(".option").forEach((blank) => {
          if (blank.children[0].innerHTML === "") {
            blank.classList.add("hide");
          }
        });
      } else {
        console.log("game over");
        finish();
      }

      document.querySelectorAll(".option").forEach((item) => {
        item.addEventListener("click", () => {
          document.querySelectorAll(".option").forEach((blank) => {
            if (blank.children[0].innerHTML === "") {
              blank.classList.add("hide");
            }
          });
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
              touchClick.play();
              scoreCount.textContent = `${score}/${mydata.length}`;
              setTimeout(() => {
                water.play();
              }, 2000);
              correct = true;
            } else {
              item.classList.add("wrongAns");

              console.log("wrong ans");
              wrong.play();
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
      setTimeout(() => {
        cover.classList.add("hide");
      }, 1500);
      console.log(score);
      if (score === 1) {
        gifScreen.removeChild(document.querySelector(".imgGif"));
        gifScreen.appendChild(imgs[1]).classList.add("imgGif");
      } else if (score === 2) {
        gifScreen.removeChild(document.querySelector(".imgGif"));
        gifScreen.appendChild(imgs[2]).classList.add("imgGif");
      } else if (score === 3) {
        gifScreen.removeChild(document.querySelector(".imgGif"));
        gifScreen.appendChild(imgs[3]).classList.add("imgGif");
      } else if (score === 4) {
        gifScreen.removeChild(document.querySelector(".imgGif"));
        gifScreen.appendChild(imgs[4]).classList.add("imgGif");
      } else {
        gifScreen.removeChild(document.querySelector(".imgGif"));
        gifScreen.appendChild(imgs[5]).classList.add("imgGif");
      }
      console.log(currentQuestion);
      // if (currentQuestion === 0) {
      //   gifScreen.removeChild(document.querySelector(".imgGif"));
      //   gifScreen.appendChild(imgs[1]).classList.add("imgGif");
      // } else if (currentQuestion === 1) {
      //   gifScreen.removeChild(document.querySelector(".imgGif"));
      //   gifScreen.appendChild(imgs[2]).classList.add("imgGif");
      // } else if (currentQuestion === 2) {
      //   gifScreen.removeChild(document.querySelector(".imgGif"));
      //   gifScreen.appendChild(imgs[3]).classList.add("imgGif");
      // } else if (currentQuestion === 3) {
      //   gifScreen.removeChild(document.querySelector(".imgGif"));
      //   gifScreen.appendChild(imgs[4]).classList.add("imgGif");
      // } else {
      //   gifScreen.removeChild(document.querySelector(".imgGif"));
      //   gifScreen.appendChild(imgs[5]).classList.add("imgGif");
      // }
    }
  }
  function finish() {
    document.querySelector(".revealBlock").classList.add("show");
    tiktok.pause();
    clap.play();
    clearInterval(timer);
    screen2.classList.remove("active");
    screen3.classList.add("active");
  }
};
