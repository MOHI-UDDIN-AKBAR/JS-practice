const menu = document.querySelector(".menu-icon");
const allBar = document.querySelector(".all-bar");

menu.addEventListener("click", () => {
  console.log(allBar.style.display);
  if (allBar.style.display !== "flex") {
    allBar.style.display = "flex";
    menu.style.transform = "rotateZ(90deg)";
  } else {
    allBar.style.display = "none";
    menu.style.transform = "rotateZ(0deg)";
  }
});
