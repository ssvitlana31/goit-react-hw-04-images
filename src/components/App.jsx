import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import { fetchImages } from 'services/api';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Loader } from './Loader';
import { Searchbar } from './Searchbar';
import { Modal } from './Modal';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [largeImageURL, setlargeImageURL] = useState('');
  const [page, setPage] = useState(1);
  const [per_page] = useState(12);
  const [images, setImages] = useState([]);
  const [showloadMore, setShowloadMore] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const firstLoadOf = useRef(true);

  useEffect(() => {
    if (firstLoadOf.current) {
      firstLoadOf.current = false;
      return;
    }
    const newFeach = async () => {
      try {
        setShowloadMore(false);
        setShowLoader(true);
        const data = await fetchImages({ page, per_page, q: searchQuery });
        if (!data.totalHits) {
          toast.warn(
            'Sorry, but nothing was found for your request. Change the request and try again.'
          );
          return;
        }
        setImages(prevImages =>
          page === 1 ? data.hits : [...prevImages, ...data.hits]
        );
        setShowloadMore(
          page === Math.ceil(data.totalHits / per_page) ? false : true
        );
      } catch (error) {
        toast.error('Oops!!! An error occurred. Please try again.');
      } finally {
        setShowLoader(false);
      }
    };
    newFeach();
  }, [searchQuery, page, per_page]);
  const handleSearchForm = query => {
    if (!query) {
      toast.warn('Please enter a request!');
      return;
    }
    if (searchQuery !== query) {
      setImages([]);
      setSearchQuery(query);
      setPage(1);
    }
  };
  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };
  const handleShowBigImg = url => {
    setlargeImageURL(url);
  };
  const closeModal = () => {
    setlargeImageURL('');
  };
  return (
    <>
      <Searchbar onSubmit={handleSearchForm} />
      {showLoader && !images ? (
        <Loader />
      ) : (
        <ImageGallery images={images} onShowBigImg={handleShowBigImg} />
      )}

      {showloadMore && <Button onLoadMore={handleLoadMore} />}
      {largeImageURL && (
        <Modal closeModal={closeModal}>
          <img src={largeImageURL} alt="Img pixabay" />
        </Modal>
      )}
    </>
  );
};
