const BASE_URL = 'https://pixabay.com/api/'
const API_KEY = '32327461-3975e0cca8f9f86b28915263f'

export const pixabayApi = (searchText) => {
    return fetch(`${BASE_URL}/?q=${searchText}&page=1&key=${API_KEY}}f&image_type=photo&orientation=horizontal&per_page=12`)
}