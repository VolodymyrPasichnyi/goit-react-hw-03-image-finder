import { Component } from "react"




export class App extends Component {
  state = {
    gallery: null,
  }
  componentDidMount () {
    fetch(`https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12`)
      .then(res => res.json())
      .then(img => this.setState({ img }));
  }

  render() {
  return (
    <div>
      {this.state.gallery && (
        <div>FKLALSdkdads</div>
      )}
    </div>
  );
}
}

