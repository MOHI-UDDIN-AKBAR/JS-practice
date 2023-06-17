const appBar = document.querySelector(".container .app-bar");
const logo = document.querySelector(".logo");

window.document.addEventListener("scroll", () => {
  appBar.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
});

logo.addEventListener("click", () => (window.location.href = "#home"));
