import { getRefs } from './getRefs';
import storage from './storage';

const LOCALSTORAGE_KEY = 'form-key';
const refs = getRefs();

initForm();
refs.form.addEventListener('input', handleInput);

function handleInput(event) {
  let savedData = storage.load(LOCALSTORAGE_KEY);
  savedData = savedData ? savedData : {};
  const { name, value } = event.target;
  savedData[name] = value;
  storage.save(LOCALSTORAGE_KEY, savedData);
}

function initForm() {
  let savedData = storage.load(LOCALSTORAGE_KEY);
  if (savedData) {
    refs.form.elements.name.value = savedData.name;
    Object.entries(savedData).forEach(([name, value]) => {
      refs.form.elements[name].value = value;
    });
  }
}
refs.form.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
  event.preventDefault();
  const { email, message, name } = event.target.elements;

  if (email.value === '' || name.value === '' || message.value === '') {
    console.log('Заповніть всі поля');
    return;
  }
  const formData = new FormData(refs.form);
  const userData = {};
  formData.forEach((value, name) => {
    userData[name] = value;
  });
  console.log(userData);
  event.target.reset();
  storage.remove(LOCALSTORAGE_KEY);
}
