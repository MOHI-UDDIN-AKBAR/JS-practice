const simpleColor = ["red", "blue", "green", "yellow", "gold"];

const body = document.querySelector("body");
const color = document.querySelector(".color");
const button = document.querySelector("button");

const handleEventListener = () => {
  const random = Math.floor(Math.random() * simpleColor.length);
  body.style.backgroundColor = simpleColor[random];
  color.innerText = simpleColor[random];
};

const changeSimpleColor = () => {
  button.removeEventListener("click", handleEventListener);
  button.addEventListener("click", handleEventListener);
};

changeSimpleColor();
