export class UnsplashAPI {
  #BASE_URL = 'https://api.unsplash.com/search/photos';
  #API_KEY = 'LxvKVGJqiSe6NcEVZOaLXC-f2JIIWZaq_o0WrF8mwJc';
  #query = '';
  #searchParams = new URLSearchParams({per_page: 10, client_id:this.#API_KEY, color:'blue', orientation:'portrait'})

  getPopularImages(page) {
    const url = `${this.#BASE_URL}?page=${page}&query=office&${this.#searchParams}`;
    return fetch(url).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  }

  getImagesBuyQuery(page) {
    const url = `${this.#BASE_URL}?page=${page}&query=${
      this.#query
    }&${this.#searchParams}`;

    return fetch(url).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  }

  set query(newQuery) {
    this.#query = newQuery;
  }
}
