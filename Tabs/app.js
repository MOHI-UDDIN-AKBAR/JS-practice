const categories = Array.from(document.querySelectorAll(".categories button"));
const tabContents = Array.from(document.querySelectorAll(".content p"));
const contentHeader = document.querySelector(".content h3");

const changeTab = (category) => {
  contentHeader.innerText = category.innerText;
  category.classList.add("color");
  for (const content of tabContents) {
    const shouldDisplay = content.classList.contains(
      category.innerText.toLowerCase()
    );
    content.style.display = shouldDisplay ? "flex" : "none";
  }
  const unClickedCategories = categories.filter(
    (each) => each.innerText !== category.innerText
  );
  unClickedCategories.forEach((each) => each.classList.remove("color"));
};
categories.forEach((category) => {
  category.addEventListener("click", () => changeTab(category));
  category.removeEventListener("click", () => changeTab(category));
});
