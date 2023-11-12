import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const datetimePicker = document.querySelector('input#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const mins = document.querySelector('span[data-minutes]');
const secs = document.querySelector('span[data-seconds]');
var selectedTime, startTime;
startBtn.disabled = true;

const spanDisplay = document.createElement('span');
spanDisplay.style.color = 'red';
startBtn.after(spanDisplay);

function displayMsg(message) {
  spanDisplay.innerText = '      ' + message;
}

function onClose(selectedDates) {
  selectedTime = selectedDates[0];
  startTime = Date.now();
  if (selectedTime < startTime) {
    displayMsg('Please choose a date in the future !');
    startBtn.disabled = true;
    return;
  }
  displayMsg('');
  startBtn.disabled = false;
  startBtn.addEventListener('click', startTimer);
}

function startTimer() {
  startBtn.disabled = true;
  datetimePicker.disabled = true;
  var timerId = setInterval(function () {
    var interval = selectedTime - Date.now();
    if (interval < 0) {
      clearInterval(timerId);
      displayMsg('Countdown timer finished !');
      startBtn.disabled = false;
      datetimePicker.disabled = false;
      return;
    }
    var dayz = Math.floor(interval / (1000 * 60 * 60 * 24));
    var hourz = Math.floor(
      (interval % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minz = Math.floor((interval % (1000 * 60 * 60)) / (1000 * 60));
    var secz = Math.floor((interval % (1000 * 60)) / 1000);

    if (dayz < 10) {
      dayz = '0' + dayz;
    }
    if (hourz < 10) {
      hourz = '0' + hourz;
    }
    if (minz < 10) {
      minz = '0' + minz;
    }
    if (secz < 10) {
      secz = '0' + secz;
    }
    hours.innerText = hourz;
    mins.innerText = minz;
    secs.innerText = secz;
  }, 1000);
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose,
};

flatpickr('#datetime-picker', options);
