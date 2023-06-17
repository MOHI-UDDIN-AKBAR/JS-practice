const video = document.querySelector("video");

const playAndPause = document.querySelector(".controls");
const playButton = document.querySelector(".play");
const pauseButton = document.querySelector(".pause");

playAndPause.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    playButton.style.backgroundColor = "white";
    pauseButton.style.backgroundColor = "rgb(88, 88, 168)";
  } else {
    video.pause();
    pauseButton.style.backgroundColor = "white";
    playButton.style.backgroundColor = "rgb(88, 88, 168)";
  }
});
