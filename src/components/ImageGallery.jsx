import React from 'react';
import { ImageGalleryItem } from './ImageGalleryItem';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export const ImageGallery = ({ images = [], handleToggleModal }) => {
  return (
    <StyledList>
      {images.map(image => (
        <ImageGalleryItem
          handleToggleModal={handleToggleModal}
          key={image.id}
          {...image}
        />
      ))}
    </StyledList>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleToggleModal: PropTypes.func.isRequired,
};

const StyledList = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 40px;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;
