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
