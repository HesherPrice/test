const TIMEOUT = 5000;

let clicks = 0;

const display = document.querySelector('#display');
const button = document.querySelector('#button');
const counter = document.querySelector('#counter');
const video = document.querySelector('#video');

button.onclick = start;

function start() {
    const startTime = Date.now();

    display.textContent = formatTime(TIMEOUT);
    button.onclick = () => {
        counter.textContent = ++clicks;
        if (clicks >= 20) {
            openVideo();
        }
    };

    const interval = setInterval(() => {
        const delta = Date.now() - startTime;
        display.textContent = formatTime(TIMEOUT - delta);
    }, 100);

    const timeout = setTimeout(() => {
        button.onclick = null;
        display.textContent = 'Game Over';

        clearInterval(interval);
        clearTimeout(timeout);
    }, TIMEOUT);
}

function formatTime(ms) {
    return Number.parseFloat(ms / 1000).toFixed(2);
}

function openVideo() {
    video.style.display = 'block'; // Показываем видео
    video.play(); // Автоматически начинаем воспроизведение
}
