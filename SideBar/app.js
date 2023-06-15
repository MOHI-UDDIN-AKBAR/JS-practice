const menuBar = document.querySelector(".menu-icon i");
const hideMenuBar = document.querySelector(".hide-bar");
const sideBar = document.querySelector(".sidebar");

menuBar.addEventListener("click", () => {
  menuBar.style.display = "none";
  sideBar.style.display = "flex";
});

hideMenuBar.addEventListener("click", () => {
  sideBar.style.display = "none";
  menuBar.style.display = "flex";
});
