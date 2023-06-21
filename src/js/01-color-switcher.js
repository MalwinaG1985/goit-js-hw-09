const bodyColor = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let intervalID = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

stopBtn.setAttribute('disabled', '');

startBtn.addEventListener('click', e => {
    e.target.setAttribute('disabled', true);
    stopBtn.removeAttribute('disabled');

    intervalID = setInterval(() => {
        bodyColor.style.backgroundColor = getRandomHexColor();
    }, 1000);
});

stopBtn.addEventListener('click', e => {
    e.target.setAttribute('disabled', true);
    startBtn.removeAttribute('disabled');
    stopBtn.disabled = false;

    clearInterval(intervalID);
});