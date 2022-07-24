import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form')

formRef.addEventListener('submit', handleSubmit)

function handleSubmit(event) {
  event.preventDefault()
  const { delay, step, amount } = event.target
  console.log(delay.value)
  console.log(step.value)
  console.log(amount.value)
  const numAmount = Number(amount.value)
  const numStep = Number(step.value)
  let numDelay = Number(delay.value)
  for (let i = 1; i <= numAmount; i += 1) { 
    createPromise(i, numDelay).then(onSucsess).catch(onError)
    numDelay += numStep;
  }
}
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => { if (shouldResolve) {
    resolve({position, delay})
  } else {
    reject({position, delay})
  }}, delay)
   })
}
function onSucsess({ position, delay }) { 
Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onError({ position, delay }) { 
Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
}
