const count = document.querySelector(".counter span");
const buttons = document.querySelectorAll(".all-buttons button");
let counter = 0;

Array.from(buttons).forEach((button) => {
  button.addEventListener("click", () => {
    switch (button.innerText.trim().toLowerCase()) {
      case "decrement": {
        counter--;
        count.innerText = counter;
        break;
      }
      case "increment": {
        counter++;
        count.innerText = counter;
        break;
      }
      case "reset": {
        counter = 0;
        count.innerText = counter;
        break;
      }
    }
  });
});
