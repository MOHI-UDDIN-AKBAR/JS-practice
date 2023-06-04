"use strick";
const container = document.querySelector(".container");
const congrats = document.querySelector(".congrats");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const signUpButton = document.querySelector(".sing-in-button");
const backToLogin = document.querySelector(".back-to-login");
const addClass = (element, isValidate) => {
  if (isValidate) {
    console.log("working");
    element.classList.remove("incorrect");
    element.classList.add("correct");
  } else {
    element.classList.remove("correct");
    element.classList.add("incorrect");
  }
};
const validateEmail = (email, emailValue) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const isValidate = emailValue.match(regex);
  addClass(email, isValidate);
};

const validatePassword = (password, passwordValue) => {
  const regex =
    /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
  const isValidate = passwordValue.match(regex);
  addClass(password, isValidate);
};

email.addEventListener("change", () => {
  const emailValue = email.value;
  validateEmail(email, emailValue);
});

password.addEventListener("change", () => {
  const passwordValue = password.value;
  validatePassword(password, passwordValue);
});

signUpButton.addEventListener("click", () => {
  const verify =
    email.classList.contains("correct") &&
    password.classList.contains("correct");
  if (verify) {
    container.style.display = "none";
    congrats.style.display = "flex";
  }
});

backToLogin.addEventListener("click", () => {
  container.style.display = "grid";
  congrats.style.display = "none";
});
