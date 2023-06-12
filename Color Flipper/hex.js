const body = document.querySelector("body");
const simple = document.querySelector("simple");
const color = document.querySelector(".color");
const button = document.querySelector("button");

const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

const handleEventListener = () => {
  let randomColor = "#";
  for (let i = 0; i < 6; i++) {
    const random = Math.floor(Math.random() * hex.length);
    randomColor += hex[random];
  }
  body.style.backgroundColor = randomColor;
  color.innerText = randomColor;
};

const changeSimpleColor = () => {
  button.removeEventListener("click", handleEventListener);
  button.addEventListener("click", handleEventListener);
};

changeSimpleColor();
