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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [per_page, setPer_page] = useState(12);
  const [q, setQ] = useState('');
  const [totalHits, setTotalHits] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [total, setTotal] = useState('');
  const [imaageURL, setImageURL] = useState(null);

  const firstLoadOf = useRef(true);

  useEffect(() => {
    if (firstLoadOf.current) {
      firstLoadOf.current = false;
      return;
    }
    const newFetch = async () => {
      setLoading(true);
      try {
        const data = await fetchImages({ page, per_page, q: q });

        if (!data.totalHits) {
          toast.warn(
            'Sorry, but nothing was found for your request. Change the request and try again.'
          );
          return;
        }
        setImages(prevImages =>
          page === 1 ? data.hits : [...prevImages, ...data.hits]
        );
      } catch (error) {
        toast.error('Oops!!! An error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    newFetch();
  }, [q, page, per_page]);

  // async componentDidUpdate(_, prevState) {
  //   if (this.state.page !== prevState.page || this.state.q !== prevState.q) {
  //     this.setState({ loading: true });

  //     try {
  //       const newImages = await fetchImages({
  //         page: this.state.page,
  //         q: this.state.q,
  //         totalHits: this.state.totalHits,
  //         per_page: this.state.per_page,
  //       });

  //       this.setState(prev => ({
  //         images: [...prev.images, ...newImages.hits],
  //         totalHits: newImages.totalHits,
  //       }));
  //     } catch (err) {
  //
  //       });
  //     } finally {
  //       this.setState({ loading: false });
  //     }
  //   }
  // }

  const handleSearchInput = q => {
    if (q !== q) {
      setQ(q), setImages([]), setPage(1);
    }
  };

  const handleSubmit = () => {
    setImages([]), setPage(1), setTotalHits(0);
    // this.setState({ images: [], page: 1, totalHits: 0 });
  };

  const handleLoadMore = () => {
    const maxPages = Math.ceil(totalHits / per_page);
    setPage(page < maxPages ? page + 1 : page);
  };

  const handleToggleModal = () => {
    setIsModalOpen();
    setImageURL(imaageURL);
    // this.setState(prevState => ({
    //   isModalOpen: !prevState.isModalOpen,
    //   imageURL: imageURL,
    // }));
  };

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
         onSubmit={handleSearchInput}
        />
      </header>
      {loading && !images ? (
        <Loader />
      ) : (
        <ImageGallery handleToggleModal={handleToggleModal} images={images} />
      )}
      {totalHits > images.length ? (
        <Button onClick={handleLoadMore} loading={loading} />
      ) : null}
      {isModalOpen ? (
        <Modal handleToggleModal={handleToggleModal} largeImageURL={imageURL} />
      ) : null}
    </div>
  );
};
