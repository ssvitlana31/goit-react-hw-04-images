import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export const Button = ({ loading, onLoadMore }) => {
  return (
    <StyledButton onClick={onLoadMore}>
      {!loading ? 'Load more' : 'Loading...'}
    </StyledButton>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export const StyledButton = styled.button`
  display: block;
  margin: 0 auto;
  padding: 8px 10px;
  font-size: 1.2rem;
  border-radius: 4px;
  background-color: blue;
  color: white;
  cursor: pointer;
  border: none;

  transition: all 0.3s ease;
  &:hover {
    background-color: lightblue;
    color: black;
    box-shadow: 0 0 10px 2px darkblue;
  }
`;
