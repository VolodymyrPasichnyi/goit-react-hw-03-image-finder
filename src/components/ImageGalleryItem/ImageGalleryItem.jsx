import { Component } from "react";
import PropTypes from 'prop-types'
import css from '../ImageGalleryItem/ImageGalleryItem.module.css'

export class ImageGalleryItem extends Component {
    hadleClick = () => {
        this.props.getLargeImage(this.props.largeImgUrl);
        this.props.toggleModal();
        console.log(this.props.largeImgUrl);
      };
    
    render () {
        const { imageUrl, tags } = this.props
        return (
            <li className={css.ImageGalleryItem} onClick={this.hadleClick}>
                <img src={imageUrl} alt={tags} />
            </li>
        )
    }
}


ImageGalleryItem.propTypes = {
    getLargeImg: PropTypes.func.isRequired,
    largeImg: PropTypes.string.isRequired,
    modal: PropTypes.func.isRequired,
    img: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,         
}