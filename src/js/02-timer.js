import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    input: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}

let chosenDate;
let timerInterval;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < Date.now()) {
            // alert('Please choose a date in the future')
            Notify.failure('Please choose a date in the future')
            refs.startBtn.disabled = true;
        } else {
            refs.startBtn.disabled = false;
        }
    chosenDate = selectedDates[0];
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const addLeadingZero = (value) => { 
   return value.toString().padStart(2, '0');
};
// --------------

const fp = flatpickr(refs.input, options);

const updateTimer = () => { 
    const currentDate = Number(Date.now());
    const difference = convertMs(chosenDate.getTime() - currentDate);
    console.log(chosenDate.getTime() - currentDate);

    if (chosenDate.getTime() - currentDate < 100) {
        clearInterval(timerInterval);
    }

    refs.days.textContent = addLeadingZero(difference.days);
    refs.hours.textContent = addLeadingZero(difference.hours);
    refs.minutes.textContent = addLeadingZero(difference.minutes);
    refs.seconds.textContent = addLeadingZero(difference.seconds);
    
    
};

const onStartBtn = () => { 
    timerInterval = setInterval(updateTimer, 100);
};
// ------ Event Listeners
refs.startBtn.addEventListener('click', onStartBtn);

