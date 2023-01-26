import PropTypes from 'prop-types'
import axios from "axios"


const BASE_URL = 'https://pixabay.com/api/'
const API_KEY = '32327461-3975e0cca8f9f86b28915263f'

export const imagesAPI = async (searchQuery, page) => {  
  try {
    const { data } = await axios.get(BASE_URL, {
        params: {
          key: API_KEY,
          q: searchQuery,
          page: page,
          image_type: 'photo',
          orientation: 'horizontal',
          per_page: 12,
        },
      })
      return data
  } catch (error) {
    console.error(error)
  }
}


imagesAPI.propTypes = {
  searchQuery: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
}