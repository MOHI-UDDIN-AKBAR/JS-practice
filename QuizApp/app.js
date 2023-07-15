// --------------------quizData----------------
const quizData = [
  {
    question: "What is the most used programming language in 2019?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    correct: "d",
  },
  {
    question: "Who is the President of US?",
    a: "Florin Pop",
    b: "Donald Trump",
    c: "Ivan Saldano",
    d: "Mihai Andrei",
    correct: "b",
  },
  {
    question: "What does HTML stand for?",
    a: "Hypertext Markup Language",
    b: "Cascading Style Sheet",
    c: "Jason Object Notation",
    d: "Helicopters Terminals Motorboats Lamborginis",
    correct: "a",
  },
  {
    question: "What year was JavaScript launched?",
    a: "1996",
    b: "1995",
    c: "1994",
    d: "none of the above",
    correct: "b",
  },
];

//--------------declare variables---------------
let sections = [];
let correctAnswerQuantity = 0;
let initialSectionIndex = 0;

// -------------Selected Elements---------------
const header = document.querySelector("header");
const main = document.querySelector("main");
const form = document.querySelector("form");
const submitButton = document.querySelector("button");
const output = document.querySelector(".output");
const resultBanner = document.querySelector(".output h1");

//-----------------Functions-----------------
const displayResults = () => {
  let successRatio = Math.round(
    (correctAnswerQuantity / quizData.length) * 100
  );
  const resultMessage = successRatio > 50 ? "succeed" : "Failed";
  const resultColor = successRatio > 50 ? "success" : "danger";
  resultBanner.innerHTML = `${resultMessage}! &nbsp;<span>${successRatio}%</span>`;
  resultBanner.classList.add(resultColor);
  resultBanner.innerHTML = `Failed! &nbsp;<span>${successRatio}%</span>`;
};

const createQuizForm = () => {
  quizData.forEach((quiz) => {
    const { question, a, b, c, d, correct } = quiz;
    const section = document.createElement("section");
    section.innerHTML = ` <h2 class="question">${question}</h2>
    <div class="choice">
      <input
        type="checkbox"
        name="choice"
        value="a"
        title="single question"
      />
      <p>${a}</p>
    </div>
    <div class="choice">
      <input
        type="checkbox"
        name="choice"
        value="b"
        title="single question"
      />
      <p>${b}</p>
    </div>
    <div class="choice">
      <input
        type="checkbox"
        name="choice"
        value="c"
        title="single question"
      />
      <p>${c}</p>
    </div>
    <div class="choice">
      <input
        type="checkbox"
        name="choice"
        value="d"
        title="single question"
      />
      <p>${d}</p>
    </div>`;
    sections.push(section);
  });
};

createQuizForm();

const displayForm = (index = 0) => {
  header.style.display = "none";
  main.style.display = "flex";
  form.insertBefore(sections[index], submitButton);
};

const handleFormSubmission = (e) => {
  e.preventDefault();
  const checkboxes = document.querySelectorAll("input");
  checkboxes.forEach((checkbox) => {
    if (
      checkbox.checked &&
      quizData[initialSectionIndex].correct === checkbox.value
    ) {
      correctAnswerQuantity++;
      console.log(correctAnswerQuantity);
    }
  });
  form.removeChild(sections[initialSectionIndex]);
  initialSectionIndex++;
  if (initialSectionIndex < quizData.length) {
    displayForm(initialSectionIndex);
  } else {
    submitButton.style.display = "none";
    output.style.display = "flex";
    displayResults();
  }
};

//----------------Event Listener---------------
header.addEventListener("click", () => displayForm(initialSectionIndex));
form.addEventListener("submit", handleFormSubmission);
