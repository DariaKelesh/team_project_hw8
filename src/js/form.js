import { getRefs } from "./getRefs";
import storage from "./storage";

const LOCALSTORAGE_KEY = "form-key";
const refs = getRefs();

refs.form.addEventListener("input", handleInput);

const userData = {};

function handleInput(event) {
    const { name, value } = event.target;
    userData[name] = value;
    storage.save(LOCALSTORAGE_KEY, userData)
}