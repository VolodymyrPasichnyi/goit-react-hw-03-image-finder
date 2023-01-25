import { Component } from "react"
import { Info } from "./Info/Info";
import { Searchbar } from "./Searchbar/Searchbar";



export class App extends Component {
  state = {
    searchText: '', 
  }


  handleSubmit = (searchText) => {
    this.setState({ searchText })
  }

  render() {
  return (
    <>
    <Searchbar
      onSearch={this.handleSubmit} 
    />
    <Info
      value={this.state.searchText}
    />
    </>
  );
}
}

