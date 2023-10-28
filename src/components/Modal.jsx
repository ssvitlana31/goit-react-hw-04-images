import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export class Modal extends React.Component {
  static propTypes = {
    handleToggleModal: PropTypes.func.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  onBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.handleToggleModal();
    }
  };

  handleKeyDown = e => {
    if (e.key === 'Escape') {
      this.props.handleToggleModal();
    }
  };

  render() {
    const { largeImageURL, handleToggleModal } = this.props;
    return (
      <ModalWrapper onClick={this.onBackdropClick}>
        <StyledModalWindow>
          <StyledWrapper>
            <button onClick={handleToggleModal}>X</button>

            <div>
              {' '}
              <StyledImage
                src={largeImageURL}
                alt="Img pixabay"
                width={800}
                height={700}
              />
            </div>
          </StyledWrapper>
        </StyledModalWindow>
      </ModalWrapper>
    );
  }
}

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
