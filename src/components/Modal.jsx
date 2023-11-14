import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Modal = ({ closeModal, ImageURL }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  const onBackdropClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <ModalWrapper onClick={onBackdropClick}>
      <StyledModalWindow>
        <StyledWrapper>
          <button onClick={closeModal}>X</button>

          <div>
            {' '}
            <StyledImage
              src={ImageURL}
              alt="Img pixabay"
              width={800}
              height={700}
            />
          </div>
        </StyledWrapper>
      </StyledModalWindow>
    </ModalWrapper>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

const ModalWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const StyledModalWindow = styled.div`
  width: fit-content;
  height: auto;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const StyledWrapper = styled.div`
  width: 800px;
  height: auto;
  background-color: white;
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
  margin: 0 10px;
  & div {
    height: 500px;
  }
  & button {
    width: 28px;
    height: 28px;
    border: 1px solid black;
    margin: 0;
    padding: 0;
    margin-bottom: 20px;
    margin-left: auto;
    display: block;
    cursor: pointer;
  }

  & div {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    overflow: hidden;
  }
`;
const StyledImage = styled.img`
  height: auto;
  width: 100%;
  object-fit: cover;
`;
