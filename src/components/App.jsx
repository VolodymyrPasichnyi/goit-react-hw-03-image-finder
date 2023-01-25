import { Component } from "react"
import { Toaster } from "react-hot-toast";
import { Button } from "./Button/Button";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem";
import { Modal } from "./Modal/Modal";
import { Searchbar } from "./Searchbar/Searchbar";
import { Loader } from "./Loader/Loader";

export class App extends Component {
  state = {
    search: '',
    page: 1,
    list: [],
    status: false,
    totalHits: 0,
    modal: false,
    largeImage: null,
  }

  handleChange = (value) => {
    this.setState({ status: value })
  }

  handleSubmit = (search) => {
    this.setState({ search, page: 1, list: [] })
  }


  imagesList = (data) => {
    if (!this.state.list) {
      return this.setState({ list: data })
    }
    if (this.state.list) {
      return this.setState(({ list }) => ({
        list: [...list,...data],
      }))
    }
  }

  totalHits = (total) => {
    this.setState({ total })
  }

  getLargeImg = (largeImage) => {
    this.setState({ largeImage })
  }

  loadMoreButton = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }))
  }

  imageModal = () => {
    this.setState(({ modal }) =>  {
      return { modal: !modal }
    })
  }

  render() {
    const { page, search } = this.state
  return (
      <>
      <Toaster />
      <Searchbar
        onSubmit={this.handleSubmit} 
      />
      <ImageGallery
        page={page} 
        search={search}
        onChange={this.handleChange}
        imagesList={this.imagesList}
        totalHits={this.totalHits}
      />
      {this.state.list?.map(el => (
      <ImageGalleryItem
        key={el.id}
        img={el.webformatUrl}
        tags={el.tags}
        largeImg={el.largeImageURL}
        modal={this.imageModal}
        getLargeImg={this.getLargeImg}
      ></ImageGalleryItem>
      ))}
      {this.state.status && <Loader />}
      {this.state.modal && (
      <Modal 
        largeImage={this.state.largeImage}
        modal={this.imageModal}
        />
      )}
      {this.state.list && this.state.status && this.state.totalHits > 12 && (
      <Button 
        loadMoreButton={this.loadMoreButton}
      />
      )}
     

      </>
  );
}
}

