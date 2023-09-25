const source = document.getElementById("source");
const video = document.getElementById("video");
const op1 = document.getElementById("op1");
const op2 = document.getElementById("op2");

op1.addEventListener("click", () => {
  source.src = "./videos/terry.mp4";
  video.muted = !video.muted;
  video.load();
  video.play();
});

op2.addEventListener("click", () => {
  source.src = "./videos/whale.mp4";
  video.muted = !video.muted;
  video.load();
  video.play();
});
