import { Component } from "react";
import { imagesAPI } from "components/services/pixabayApi";
import { toast } from "react-hot-toast";
import PropTypes from 'prop-types'
import css from '../ImageGallery/ImageGallery.module.css'


export class ImageGallery extends Component {
    state = {
        error: null,
    }

    async componentDidUpdate(prevProps) {
        const currentSearchQuery = this.props.searchQuery;
        const currentPage = this.props.page;
        const prevSearchQuery = prevProps.searchQuery;
        const prevPage = prevProps.page;
    
        if (prevSearchQuery !== currentSearchQuery || prevPage !== currentPage) {
          this.props.changeLoadingStatus(true);
    
          try {
            const data = await imagesAPI(currentSearchQuery, currentPage);
            if (data.hits.length === 0) {
              toast.error(`Sorry, there are no images matching your search query`);
              return;
            }
            if (currentPage === 1) {
              toast.success(`Hooray! We found ${data.totalHits} images.`);
            }
    
            this.props.getImageList(data.hits);
            this.props.getTotalHits(data.totalHits);
          } catch (error) {
            this.setState({ error });
            return toast.error(
              `Something went wrong. ${this.state.error}. Please, try again later`
            );
          } finally {
            this.props.changeLoadingStatus(false);
          }
        }
    }
     
    render() {
        const { imagesList } = this.props
        return (
            <div>
              {imagesList && 
              <ul className={css.ImageGallery}>
                {this.props.children}
              </ul>}
            </div>
        )
    }   
}


ImageGallery.propTypes = {
    changeLoadingStatus: PropTypes.func.isRequired,
    getImageList: PropTypes.func.isRequired,
    getTotalHits: PropTypes.func.isRequired,
    searchQuery: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    imageList: PropTypes.array,
    children: PropTypes.array.isRequired,
  };