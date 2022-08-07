import { UnsplashAPI } from './UnsplashAPI';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import { createGalleryCards } from '../templates/createGalleryCards';

const listRef = document.querySelector('.js-gallery');
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
