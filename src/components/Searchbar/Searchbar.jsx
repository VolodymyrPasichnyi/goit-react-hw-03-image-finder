import PropTypes from 'prop-types'
import { Component } from 'react'
import  toast  from 'react-hot-toast'
import css from '../Searchbar/Searchbar.module.css'


export class Searchbar extends Component {
  state = {
    search: '',
  }

  handleChange = e => {
    const { value } = e.target;
    const normalizeValue = value.toLowerCase();
    this.setState({ search: normalizeValue })
  }

  handleSubmit = e => {
    e.preventDefault()
    if (!this.state.search.trim()) {
      toast.error('Error')
      return;
    }
    this.props.onSubmit(this.state.search)
    this.setState({
      search: '',
    })
  }
 
  render () {
    return (
      <div>
        <header className={css.Searchbar}>
          <form 
            className={css.SearchForm}
            onSubmit={this.handleSubmit}  
          >
            <button type="submit" className={css.SearchFormButton}>
              <span className={css.SearchFormButtonLabel}>Search</span>
            </button>
            <input
              className={css.SearchFormInput}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              name='search'
              value={this.state.search}
              onChange={this.handleChange}
            />
          </form>
        </header>
      </div>
    )
  }
}   


Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}