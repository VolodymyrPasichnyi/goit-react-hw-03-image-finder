import { Component } from "react";
import PropTypes from 'prop-types'


export  class Searchbar extends Component {
    state = {
        value: '',
    }

    handleChange = ({ target: {value} }) => {
        this.setState({ value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.value)
        this.props.onSearch(this.state.value)
      }

    render() {
        return (
          <div>
            <header 
                className="searchbar">
              <form 
                className="form" 
                onSubmit={this.handleSubmit}
               >
                <button 
                    type="submit" 
                    className="button">
                  <span className="button-label">Search</span>
                </button>
              <input
                className="input"
                type="text"
                placeholder="Search images and photos"
                value={this.state.value}
                onChange={this.handleChange}
              />
              </form>
            </header>
          </div>
        )
    }
}   


// Searchbar.propTypes = {
//  onSubmit: PropTypes.func.isRequired,   
// }