import { UnsplashAPI } from './UnsplashAPI';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createGalleryCards } from '../templates/createGalleryCards';

const listRef = document.querySelector('.js-gallery');
const formRef = document.querySelector('.js-search-form');
const unsplashApi = new UnsplashAPI();
const container = document.getElementById('tui-pagination-container');
const options = {
  totalItems: 0,
  itemsPerPage: 10,
  visiblePages: 5,
  page: 1,
};
const pagination = new Pagination(container, options);
const page = pagination.getCurrentPage();
console.log(page);
unsplashApi.getPopularImages(page).then(({ total, total_pages, results }) => {
  pagination.reset(total);

  const markUp = createGalleryCards(results);
  listRef.insertAdjacentHTML('beforeend', markUp);
});
pagination.on('afterMove', event => {
  const currentPage = event.page;

  unsplashApi
    .getPopularImages(currentPage)
    .then(({ total, total_pages, results }) => {
      const markUp = createGalleryCards(results);
      listRef.insertAdjacentHTML('beforeend', markUp);
    });
});

formRef.addEventListener('submit', handleSubmit);

function handleSubmit(evt) {
  evt.preventDefault();
  const { query } = evt.currentTarget.elements;
  const searchValue = query.value.trim();
  console.log(searchValue);
  if (!searchValue) {
    Notify.failure('Введіть корректне значення');
    return;
  }
  listRef.innerHTML = '';
  unsplashApi.query = searchValue;
  unsplashApi
    .getImagesBuyQuery(page)
    .then(({ total, total_pages, results }) => {
      pagination.reset(total);

      const markUp = createGalleryCards(results);

      listRef.insertAdjacentHTML('beforeend', markUp);
    });
}
