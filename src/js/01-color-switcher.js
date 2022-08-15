const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
    body: document.body,
}

const getRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const changeBodyColor = () => {
    refs.body.style.backgroundColor = getRandomHexColor();
};

let isChangingActive = false;
let colorInterval;
const onBtnStart = () => { 
    if (isChangingActive) {
        return;
    }
    isChangingActive = true;
    colorInterval = setInterval(changeBodyColor, 1000);
};

const onBtnStop = () => { 
    if (isChangingActive) {
        isChangingActive = false;
        clearTimeout(colorInterval);
    };
};
// ----Event Listeners 
refs.startBtn.addEventListener('click', onBtnStart);
refs.stopBtn.addEventListener('click', onBtnStop);
