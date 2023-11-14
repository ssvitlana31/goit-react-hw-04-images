import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StyledButton } from './Button';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState(''),
    handleFormSubmit = e => {
      e.preventDefault();
      onSubmit(query);
    };

  const handleInputChange = ({ target: { value } }) => {
    setQuery(value);
  };

  return (
    <header>
      <StyledForm onSubmit={onSubmit}>
        <StyledInput
          type="text"
          autoComplete="off"
          autoFocus
          name="query"
          placeholder="Search images and photos"
          onChange={handleInputChange}
        />
        <StyledButtonSearch onClick={handleFormSubmit} type="submit">
          Search
        </StyledButtonSearch>
      </StyledForm>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const StyledInput = styled.input`
  padding: 10px;
  font-size: 16px;
  max-width: 400px;
  border: 1px solid #ccc;
  flex: 1;
`;

const StyledButtonSearch = styled(StyledButton)`
  padding: 10px 20px;
  margin-left: 20px;
`;
