import { Component } from "react";
import PropTypes from 'prop-types'
import { createPortal } from 'react-dom';
import css from '../Modal/Modal.module.css'

// const modal = document.addEventListener('#modal-root')


export class Modal extends Component {
    handleKey = (e) => {
        if (e.code === 'Escape') {
            this.props.Modal()
        }
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKey);
    }
    
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKey);
    }


    closeModal = (e) => {
        if (e.target === e.currentTarget) {
            this.props.Modal();
          }
    }
    
    
    render () {
        return createPortal (
            <div 
                className={css.Overlay}
                onClick={this.handleClose}>
              <div className={css.Modal}>
                <img src={this.prop.largeImage} alt="" />
              </div>
            </div>
          )
    }
}

Modal.propTypes = {
    Modal: PropTypes.func.isRequired,
    largeImage: PropTypes.string.isRequired,
}