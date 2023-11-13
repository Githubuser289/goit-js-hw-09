import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formElem = document.querySelector('.form'),
  delayInput = document.querySelector('input[name="delay"]'),
  stepInput = document.querySelector('input[name="step"]'),
  amountInput = document.querySelector('input[name="amount"]');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}

function generatePromises(event) {
  event.preventDefault();
  var delayValue = Number(delayInput.value),
    stepValue = Number(stepInput.value),
    amountValue = Number(amountInput.value);

  for (let counter = 1; counter <= amountValue; counter++) {
    createPromise(counter, delayValue)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    delayValue += stepValue;
  }

  formElem.reset();
}

formElem.addEventListener('submit', generatePromises);
