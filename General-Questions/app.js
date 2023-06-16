const generalQuestionsAndAnswer = [
  {
    question: "What is JavaScript?",
    answer: `JavaScript is a popular programming language used to create
    interactive and dynamic elements on websites. It runs on the client
    side (in the web browser) and enables functionality such as form
    validation, dynamic content updates, and interactive features like
    sliders and animations`,
  },
  {
    question: "How do you declare variables in JavaScript?",
    answer: `In JavaScript, you can declare variables using the var, let, or const keywords.`,
  },
  {
    question: "What is the difference between == and === in JavaScript?",
    answer: `In JavaScript, == is used for loose equality comparison, while === is used for strict equality comparison. The main difference is that == performs type coercion, which means it converts the operands to a common type before comparison, while === does not perform type coercion and checks for both value and type equality.`,
  },
];

const allQuestions = document.querySelector(".all-questions");

let htmlElement = "";
generalQuestionsAndAnswer.forEach(({ question, answer }) => {
  htmlElement += `<div class="single-question">
    <div class="question">
    <span>${question}</span>
    <span><i class="fa-regular fa-square-plus"></i></span>
    </div>
    <small class="answer">
    ${answer}
    </small>
    </div>`;
  allQuestions.innerHTML = htmlElement;
});

const showAnswer = (plusButton, i, answers) => {
  if (plusButton.classList.contains("fa-square-plus")) {
    plusButton.classList.remove("fa-square-plus");
    plusButton.classList.add("fa-square-minus");
    answers[i].style.display = "flex";
  } else if (plusButton.classList.contains("fa-square-minus")) {
    plusButton.classList.remove("fa-square-minus");
    plusButton.classList.add("fa-square-plus");
    answers[i].style.display = "none";
  }
};

const addAnimation = (plusButton) => {
  if (plusButton.classList.contains("fa-square-plus")) {
    plusButton.style.transition = "transform .5s";
    plusButton.style.transform = "rotateZ(180deg)";
  } else {
    plusButton.style.transition = "transform .5s";
    plusButton.style.transform = "rotateZ(0deg)";
  }
};

const getAnswer = () => {
  const plusButtons = document.querySelectorAll(".question span i");
  const answers = document.querySelectorAll(".answer");
  Array.from(plusButtons).forEach((plusButton, i) => {
    plusButton.addEventListener("click", () => {
      addAnimation(plusButton);
      closeOtherAnswer(
        Array.from(plusButtons),
        plusButton,
        Array.from(answers)
      );
      showAnswer(plusButton, i, answers);
    });
    plusButton.removeEventListener("click", () => {
      closeOtherAnswer(
        Array.from(plusButtons),
        plusButton,
        Array.from(answers)
      );
      showAnswer(plusButton, i, answers);
    });
  });
};
getAnswer();

const closeOtherAnswer = (plusButtons, clickedButton, answers) => {
  plusButtons.forEach((plusButton, i) => {
    if (
      plusButton.classList.contains("fa-square-minus") &&
      plusButton !== clickedButton
    ) {
      plusButton.classList.remove("fa-square-minus");
      plusButton.classList.add("fa-square-plus");
      answers[i].style.display = "none";
    }
  });
};
