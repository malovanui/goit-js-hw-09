import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const refs = {
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
  submitBtn: document.querySelector('[type="submit"]'),
};




function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {

      const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
    resolve({ position, delay });
  } else {
    // Reject
    reject({ position, delay });
      };
    }, delay)
    
  })
  .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
};

  


const onSubmitBtn = (e) => { 
  e.preventDefault();
  let currentDelay = Number(refs.delay.value);
  for (let i = 1; i <= refs.amount.value; i += 1) {
    
    createPromise(i, currentDelay);
    currentDelay += Number(refs.step.value);
   
  }
};

//--------Event listeners
refs.submitBtn.addEventListener('click', onSubmitBtn)