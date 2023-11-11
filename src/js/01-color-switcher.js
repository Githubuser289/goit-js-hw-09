let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function activateChangeColor() {
  timerId = setInterval(() => {
    bodyElem.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtn.disabled = true;
  stopBtn.disabled = false;
}
function deactivateChangeColor() {
  clearInterval(timerId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

const bodyElem = document.getElementsByTagName('body')[0];
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
stopBtn.disabled = true;

// atasez eventlistener pe cele 2 butoane
// la apasarea unuia, il dezactivez pe celalalt
startBtn.addEventListener('click', activateChangeColor);
stopBtn.addEventListener('click', deactivateChangeColor);
