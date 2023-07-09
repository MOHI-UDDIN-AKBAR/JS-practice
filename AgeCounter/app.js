// Select Elements

const age = document.querySelector(".age-counter p span");
const result = document.querySelector(".age-counter p");
const input = document.querySelector("input");
const button = document.querySelector(".age-counter .date button ");

// Functions
const handleEvent = () => {
  const date = input.value;
  const getYear = new Date().getFullYear() - new Date(date).getFullYear();
  age.textContent = getYear;
  result.style.visibility = "visible";
};

// Event Listener
button.addEventListener("click", handleEvent);
