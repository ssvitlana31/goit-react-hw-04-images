import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { fetchImages } from 'services/api';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Loader } from './Loader';
import { Searchbar } from './Searchbar';
import { Modal } from './Modal';

export class App extends Component {
  state = {
    loading: false,
    error: null,
    images: [],
    page: 1,
    per_page: 12,
    q: '',
    totalHits: 0,
    isModalOpen: false,
    total: '',
    imageURL: null,
  };

  async componentDidUpdate(_, prevState) {
    if (this.state.page !== prevState.page || this.state.q !== prevState.q) {
      this.setState({ loading: true });

      try {
        const newImages = await fetchImages({
          page: this.state.page,
          q: this.state.q,
          totalHits: this.state.totalHits,
          per_page: this.state.per_page,
        });

        this.setState(prev => ({
          images: [...prev.images, ...newImages.hits],
          totalHits: newImages.totalHits,
        }));
      } catch (err) {
        this.setState({ error: err.message }, () => {
          toast.error(this.state.error);
        });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  handleSearchInput = q => {
    if (this.state.q !== q) {
      this.setState({ q, images: [], page: 1 });
    }
  };

  handleSubmit = async () => {
    this.setState({ images: [], page: 1, totalHits: 0 });
  };

  handleLoadMore = () => {
    const { page, per_page, totalHits } = this.state;
    const maxPages = Math.ceil(totalHits / per_page);
    this.setState({
      page: page < maxPages ? page + 1 : page,
    });
  };

  handleToggleModal = imageURL => {
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen,
      imageURL: imageURL,
    }));
  };

  render() {
    const { images, loading, imageURL, isModalOpen, totalHits } = this.state;
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontSize: 18,
          color: `#000000`,
        }}
      >
        <header>
          <Searchbar
            onSearchInput={this.handleSearchInput}
            handleSubmit={this.handleSubmit}
            query={this.state.query}
          />
        </header>
        {loading && !images ? (
          <Loader />
        ) : (
          <ImageGallery
            handleToggleModal={this.handleToggleModal}
            images={images}
          />
        )}
        {totalHits > images.length ? (
          <Button onClick={this.handleLoadMore} loading={loading} />
        ) : null}
        {isModalOpen ? (
          <Modal
            handleToggleModal={this.handleToggleModal}
            largeImageURL={imageURL}
          />
        ) : null}
      </div>
    );
  }
}
