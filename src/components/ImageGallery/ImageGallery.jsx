import { Component } from 'react';
import { pixabayApi } from 'services/pixabayApi';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import css from '../ImageGallery/ImageGallery.module.css'


export class ImageGallery extends Component {
  state = {
    error: null,
  }

  async componentDidUpdate(prevProps) {
    const currentSearch = this.props.search
    const prevSearch = prevProps.search
    const currentPage = this.props.page
    const prevPage = prevProps.page

    if (prevSearch !== currentSearch || prevPage !== currentPage) {
      this.props.statusChange(true)

      try {
        const data = await pixabayApi(currentSearch, currentPage)
        if (data.hits.length === 0) {
          return toast.error(`No find images`)
        }
        if (currentPage === 1) {
          toast.success(`We found ${data.totalHits} images`)
        }
        this.props.imageList(data.hits)
        this.props.totalHits(data.totalHits)
      } catch (error) {
        this.setState({ error })
        return toast.error(`Please, try again later`)
      } finally {
        this.props.statusChange(false)
      }
    }
  }

  render() {
    return (
      <div>
        {this.props.list && <ul className={css.ImageGallery}>{this.props.children}</ul>}
      </div>
      )
  }
}

ImageGallery.propTypes = {
  statusChange: PropTypes.func.isRequired,
  imageList: PropTypes.func.isRequired,
  totalHits: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  list: PropTypes.array.isRequired,
  children: PropTypes.array.isRequired,
};
