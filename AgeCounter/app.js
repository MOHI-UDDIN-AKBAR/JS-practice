// Select Elements

const age = document.querySelector(".age-counter p span");
const result = document.querySelector(".age-counter p");
const input = document.querySelector("input");
const button = document.querySelector(".age-counter .date button ");

// Functions
const handleEvent = () => {
  const date = input.value;
  const getYear = new Date().getFullYear() - new Date(date).getFullYear();
  const getMonth = new Date().getMonth() - new Date(date).getMonth();
  const getDay = new Date().getDate() - new Date(date).getDate();
  console.log(getYear + "\t" + getMonth + "\t" + getDay);
  if (getYear > 0) {
    age.textContent = getYear > 1 ? `${getYear} years` : `${getYear} year`;
    result.style.visibility = "visible";
    result.classList.add("success");
  } else if (getMonth > 0) {
    age.textContent = getMonth > 1 ? `${getMonth} months` : `${getMonth} month`;
    result.style.visibility = "visible";
    result.classList.add("success");
  } else if (getDay > 0) {
    age.textContent = getDay > 1 ? `${getDay} days` : `${getDay} day`;
    result.style.visibility = "visible";
    result.classList.add("success");
  } else {
    result.textContent = "Sorry ! Your Input is not valid ";
    result.style.visibility = "visible";
    result.classList.add("danger");
  }
};

// Event Listener
button.addEventListener("click", handleEvent);
