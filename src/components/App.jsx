import React, { Component } from 'react';
import { Toaster } from 'react-hot-toast';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';


export class App extends Component {
  state = {
    search: '',
    page: 1,
    list: [],
    totalhits: 0,
    largeImage: null,
    status: false,
    modal: false,
  };

  handleSubmit = search => {
    this.setState({ search, page: 1, list: [] })
  }

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }))
  }

  statusChange = value => {
    this.setState({ status: value })
  }

  toggleModal = () => {
    this.setState(({ modal }) => ({ modal: !modal }))
  }

  largeImages = largeImage => {
    this.setState({ largeImage })
  }

  totalHits = totalhits => {
    this.setState({ totalhits })
  }

  imageList = data => {
    if (!this.state.list) {
      this.setState({ list: data })
      return
    }
    if (this.state.list) {
      this.setState(({ list }) => ({
        list: [...list, ...data],
      }))
      return
    }
  }

  render() {
    const {
      search,
      page,
      list,
      totalhits,
      largeImage,
      status,
      modal,
    } = this.state
    return (
      <div>
        <Toaster />
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery
          search={search}
          page={page}
          list={list}
          imageList={this.imageList}
          totalHits={this.totalHits}
          statusChange={this.statusChange}
        >
          {list?.map(el => (
            <ImageGalleryItem
              key={el.id}
              image={el.webformatURL}
              largeImg={el.largeImageURL}
              tags={el.tags}
              toggleModal={this.toggleModal}
              largeImages={this.largeImages}
            ></ImageGalleryItem>
          ))}
        </ImageGallery>
        {status && <Loader />}
        {modal && (
          <Modal 
            largeImage={largeImage}
            toggleModal={this.toggleModal}
          />
        )}
        {list && totalhits > 12 && (
          <Button loadMore={this.loadMore} />
        )}
      </div>
    )
  }
}
