import { Component } from "react";
import { pixabayApi } from "components/services/pixabayApi";
import { toast } from "react-hot-toast";
import PropTypes from 'prop-types'
import css from '../ImageGallery/ImageGallery.module.css'


export class ImageGallery extends Component {
    state = {
        error: null,
    }

    async componentDidUpdate(prevProps) {
        const request = this.props.search
        const prevRequest = prevProps.search
        const page = this.props.page
        const prevPage = prevProps.page

        if (prevRequest !== request || prevPage !== page ) {
            this.props.onChange(true)
        }
            try {
                const data = await pixabayApi(request, page)
                if (data.hits.length === 0) {
                    toast.warn('No find images')
                    return;
                }
                if (page === 1) {
                    toast.success(`We found ${data.total} images`)
                }
                this.props.imagesList(data.hits)
                this.props.totalHits(data.total)
            } catch(error) {
                this.setState({ error })
                return toast.error('Error')
            } finally {
                this.props.onChange(false)
            }
    }
     
    render() {
        return (
            <div>
              {this.props.imagesList && 
              <ul className={css.ImageGallery}>{this.props.children}</ul>}
            </div>
        )
    }   
}


ImageGallery.propTypes = {
    search: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    imagesList: PropTypes.func.isRequired,
    totalHits: PropTypes.func.isRequired,
}