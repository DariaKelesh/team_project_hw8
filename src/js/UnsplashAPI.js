export class UnsplashAPI {
#BASE_URL = 'https://api.unsplash.com/search/photos';
#API_KEY = 'LxvKVGJqiSe6NcEVZOaLXC-f2JIIWZaq_o0WrF8mwJc';
getPopularImages(page){
    const url = `${this.#BASE_URL}?page=${page}&query=office&per_page=10&color=blue&orientation=portrait&client_id=${this.#API_KEY}`
fetch(url).then(res=>{console.log(res)}) 
}
}

