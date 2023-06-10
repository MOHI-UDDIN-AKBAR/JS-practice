const typeOfSentence = document.querySelectorAll(".type span");
const paragraph = document.querySelector(".paragraph p span");
const pTag = document.querySelector(".paragraph p");
const textarea = document.querySelector("textarea");

const checkTypingInput = () => {
  // Remove existing event listener if it exists
  textarea.removeEventListener("keypress", handleKeyPress);

  // Add event listener to handle keypress
  textarea.addEventListener("keypress", handleKeyPress);
};

const createElement = (char) => {
  const element = document.createElement("span");
  const elementText = document.createTextNode(char);
  element.appendChild(elementText);
  return element;
};

const handleKeyPress = (e) => {
  const text = paragraph.innerText.split("");
  let count = 0;
  count++;
  if (e.key === text[count - 1]) {
    paragraph.innerText = text.slice(count).join("");
    pTag.insertBefore(createElement(e.key), paragraph);
  } else {
    const element = createElement(text[count - 1]);
    element.style.color = "red";
    paragraph.innerText = text.slice(count).join("");
    pTag.insertBefore(element, paragraph);
  }
};

Array.from(typeOfSentence).forEach((type) => {
  type.addEventListener("click", () => {
    switch (type.innerText.trim().toLowerCase()) {
      case "uppercase": {
        paragraph.innerText = paragraph.innerText.toUpperCase();
        break;
      }
      case "lowercase": {
        paragraph.innerText = paragraph.innerText.toLowerCase();
        break;
      }
      case "capitalize": {
        paragraph.innerText = paragraph.innerText
          .split(" ")
          .map(
            (eachWord) =>
              eachWord.charAt(0).toUpperCase() + eachWord.slice(1).toLowerCase()
          )
          .join(" ");
        break;
      }
    }
    checkTypingInput();
  });
});
checkTypingInput();
