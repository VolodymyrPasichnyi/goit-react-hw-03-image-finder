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
    totalhit: 0,
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
       this.setState({ list: data })
       return
    }
    if (this.state.list) {
       this.setState(({ list }) => ({
        list: [...list,...data],
      }))
      return  
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
    this.setState(({ modal }) =>  ({ modal: !modal }))
  }

  render() {
    const {     
      search,
      page,
      list,
      status,
      totalhit,
      modal,
      largeImage 
    } = this.state
  return (
      <div>
      <Toaster />
      <Searchbar
        onSubmit={this.handleSubmit} 
      />
      <ImageGallery
        page={page} 
        search={search}
        list={list}
        handleChange={this.handleChange}
        imagesList={this.imagesList}
        totalHits={this.totalHits}
      >
      {list?.map(el => (
      <ImageGalleryItem
        key={el.id}
        img={el.webformatUrl}
        tags={el.tags}
        largeImg={el.largeImageURL}
        modal={this.imageModal}
        getLargeImg={this.getLargeImg}
      ></ImageGalleryItem>
      ))}
     </ImageGallery>
      {status && <Loader />}

      {modal && (
      <Modal 
        largeImage={largeImage}
        modal={this.imageModal}
        />
      )}
      {list && totalhit > 12 && (
      <Button 
        loadMoreButton={this.loadMoreButton}
      />
      )}
      </div>
  );
}
}

