import flatpickr from 'flatpickr';
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
import '../css/common.css';

const date = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const deysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const val = document.querySelector('.value');

let timerId = null;
startBtn.setAttribute('disabled', true);

flatpickr(date, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] <= Date.now()) {
            Notiflix.Notify.failure('Please choose a date in the future');
            return;
        } else {
         startBtn.removeAttribute('disabled');
        }
  },
});

startBtn.addEventListener('click', onStartBtn);

function onStartBtn() {
    val.forEach(e => e.classList.toggle('end'));
    startBtn.disabled = true;
    date.disabled = true;

    timerId = setInterval(() => {
        const selectData = new Date(date.value);
        const timeToEnd = selectData - Date.now();
        const { days, hours, minutes, seconds } = convertMs(timeToEnd);

        days.textContent = addLeadingZero(days);
        hours.textContent = addLeadingZero(hours);
        minutes.textContent = addLeadingZero(minutes);
        seconds.textContent = addLeadingZero(seconds);

        if (timeToEnd < 1000) {
            date.forEach(e => e.classList.toggle('end'));
            clearInterval(timerId);
            date.disabled = false;
        }
    }, 1000);
}

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


function addLeadingZero(value) {
    return `${value}`.padStart(2, '0');
}