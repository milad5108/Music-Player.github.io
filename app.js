const playBtn = document.querySelector(".play");
const playBtnIcon = document.querySelector(".playBtn");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const container = document.querySelector(".container");
const audio = document.querySelector(".audio");
const image = document.querySelector(".image");
const progressContainer = document.querySelector(".progress-container");
const musicName = document.querySelector(".music-name");

const progress = document.querySelector(".progress");

const songs = ["Shadmehr Aghili - Bi Ehsas", "Shadmehr Aghili - Rooze Sard"];
let songIndex = 0;

// functions
// play music
function playHandler() {
  if (playBtnIcon.classList.contains("fa-play")) {
    audio.play();
    playBtn.querySelector("i").classList.remove("fa-play");
    playBtn.querySelector("i").classList.add("fa-pause");
  } else {
    audio.pause();
    playBtn.querySelector("i").classList.remove("fa-pause");
    playBtn.querySelector("i").classList.add("fa-play");
  }

  container.classList.add("move1");
}

// change image, music and title
function change() {
  image.src = `images/${songs[songIndex]}.jpg`;
  audio.src = `music/${songs[songIndex]}.mp3`;
  musicName.innerHTML = songs[songIndex];
}

// play after change music
function playMusic() {
  if (playBtnIcon.classList.contains("fa-pause")) {
    audio.play();
  } else {
    audio.pause();
  }
}

// move image
function move() {
  if (container.classList.contains("move1")) {
    container.classList.remove("move1");
    container.classList.add("move2");
  } else {
    container.classList.remove("move2");
    container.classList.add("move1");
  }
}

// next music
function nextHandler() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  change();
  playMusic();
  move();
}

// previous music
function prevHandler() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  change();
  playMusic();
  move();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// eventHandler
playBtn.addEventListener("click", playHandler);
nextBtn.addEventListener("click", nextHandler);
prevBtn.addEventListener("click", prevHandler);

audio.addEventListener("ended", nextHandler);
audio.addEventListener("timeupdate", updateProgress);

progressContainer.addEventListener("click", setProgress);
