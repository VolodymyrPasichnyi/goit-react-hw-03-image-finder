import { Component } from "react";
import PropTypes from 'prop-types'
import css from '../ImageGalleryItem/ImageGalleryItem.module.css'

export class ImageGalleryItem extends Component {
    modalClick = () => {
        this.props.getLargeImg(this.props.largeImg)
        this.props.modal()
      }
    
    render () {
        const { img, tags } = this.props
        return (
            <li className={css.ImageGalleryItem} onClick={this.modalClick}>
                <img src={img} alt={tags} />
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