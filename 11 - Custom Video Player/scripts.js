const player = document.querySelector(".player");
const video = document.querySelector(".viewer");
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress__filled");
const toggleBtn = document.querySelector(".toggle");
const ranges = document.querySelectorAll(".player__slider");
const skipBtns = document.querySelectorAll("[data-skip]");

const togglePlay = () => {
  const method = video.paused ? "play" : "pause";
  video[method]();
  // for updating icon when video is played or paused
};

const updateIcon = () => {
  toggleBtn.textContent = video.paused ? "▶" : "▐▐";
};

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.setAttribute('style', `flex-basis: ${percent}%`)
}

function scrub(e) {
    if(mousedown === false) return;
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateIcon);
video.addEventListener("pause", updateIcon);
video.addEventListener("timeupdate", handleProgress); 

toggleBtn.addEventListener("click", togglePlay);
skipBtns.forEach((button) => button.addEventListener("click", skip));
ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) =>range.addEventListener("mousemove", handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', scrub);
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);