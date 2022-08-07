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
  template: {
         page: '<a href="#" class="tui-page-btn">{{page}}</a>',
         currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
         moveButton:
             '<a href="#" class="tui-page-btn tui-{{type}}">' +
                 '<span class="tui-ico-{{type}}">{{type}}</span>' +
             '</a>',
         disabledMoveButton:
             '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
                 '<span class="tui-ico-{{type}}">{{type}}</span>' +
             '</span>',
         moreButton:
             '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
                 '<span class="tui-ico-ellip">...</span>' +
             '</a>'
     }
};
const pagination = new Pagination(container, options);
const page = pagination.getCurrentPage();
console.log(page);
unsplashApi.getPopularImages(page).then(({ total, total_pages, results }) => {
  if (results.length === 0) {
    container.classList.add('is-hidden');
    return;
  }
  pagination.reset(total);
  container.classList.remove('is-hidden');
  const markUp = createGalleryCards(results);
  listRef.insertAdjacentHTML('beforeend', markUp);
});
const popular = event => {
    const currentPage = event.page;
  
    unsplashApi
      .getPopularImages(currentPage)
      .then(({ total, total_pages, results }) => {
        const markUp = createGalleryCards(results);
        listRef.insertAdjacentHTML('beforeend', markUp);
      });
  }
pagination.on('afterMove', popular );

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
    pagination.off("afterMove", popular);
    pagination.off("afterMove", createByQuery)

  listRef.innerHTML = '';
  unsplashApi.query = searchValue;
  unsplashApi
    .getImagesBuyQuery(page)
    .then(({ total, total_pages, results }) => {
       if (results.length === 0) {
    container.classList.add('is-hidden');
    return;
      }
      pagination.reset(total);
       container.classList.remove('is-hidden');
      const markUp = createGalleryCards(results);

        listRef.insertAdjacentHTML('beforeend', markUp);
        pagination.on("afterMove", createByQuery)
    });
}

function createByQuery(event) {
    const currentPage = event.page;
  
    unsplashApi
      .getImagesBuyQuery(currentPage)
      .then(({ total, total_pages, results }) => {
        const markUp = createGalleryCards(results);
        listRef.insertAdjacentHTML('beforeend', markUp);
      });
}