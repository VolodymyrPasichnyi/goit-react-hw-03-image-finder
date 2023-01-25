import PropTypes from 'prop-types'
import css from '../Button/Button.module.css'

export const Button = ({ loadMoreButton }) => {
    return (
        <div>
            <button
                className={css.Button} 
                type="button"
                onClick={() => {loadMoreButton()}}>Load More</button>
        </div>
    )
}

Button.propTypes = {
    loadMoreButton: PropTypes.func.isRequired,
}