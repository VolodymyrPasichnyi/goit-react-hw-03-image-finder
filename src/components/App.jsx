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
    searchQuery: '',
    page: 1,
    showModal: false,
    imageList: [],
    largeImage: null,
    totalhits: 0,
    isLoading: false,
  }


  handleSubmit = searchQuery => {
    this.setState({ searchQuery, page: 1, imageList: [] });
  };

  changeLoadingStatus = value => {
    this.setState({ isLoading: value });
  };

  getTotalHits = totalhits => {
    this.setState({ totalhits });
  };

  getImageList = data => {
    if (!this.state.imageList) {
      this.setState({ imageList: data });
      return;
    }
    if (this.state.imageList) {
      this.setState(({ imageList }) => ({
        imageList: [...imageList, ...data],
      }));
      return;
    }
  };



  // getLargeImg = (largeImage) => {
  //   this.setState({ largeImage })
  // }

  // loadMoreButton = () => {
  //   this.setState(prevState => ({ page: prevState.page + 1 }))
  // }

  // imageModal = () => {
  //   this.setState(({ modal }) =>  ({ modal: !modal }))
  // }

  render() {
    const {     
      searchQuery,
      page,
      showModal,
      imageList,
      largeImage,
      totalhits,
      isLoading,
    } = this.state
  return (
      <div>
      <Toaster />
      <Searchbar
        onSubmit={this.handleSubmit} 
      />
      <ImageGallery
        page={page} 
        searchQuery={searchQuery}
        imageList={imageList}
        getImageList={this.getImageList}
        getTotalHits={this.getTotalHits}
        changeLoadingStatus={this.changeLoadingStatus}
      >
      {imageList?.map(image => (
      <ImageGalleryItem
      key={image.webformatURL}
      imageUrl={image.webformatURL}
      tags={image.tags}
        // largeImg={el.largeImageURL}
        // modal={this.imageModal}
        // getLargeImg={this.getLargeImg}
      ></ImageGalleryItem>
      ))}
     </ImageGallery>
      {/* {status && <Loader />}

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
      )} */}
      </div>
  );
}
}

