import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StyledButton } from './Button';

export class Searchbar extends React.Component {
  static propTypes = {
    onSearchInput: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };

  state = {
    inputValue: '',
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onSearchInput(this.state.inputValue);
  };

  handleInputCheange = ({ target }) => {
    this.setState({ inputValue: target.value });
  };

  render() {
    const disabled = !this.state.inputValue.length;
    return (
      <header>
        <StyledForm onSubmit={this.onSubmit}>
          <StyledInput
            type="text"
            autoComplete="off"
            autoFocus
            name="query"
            placeholder="Search images and photos"
            onChange={this.handleInputCheange}
          />
          <StyledButtonSearch
            onClick={this.handleSubmit}
            type="submit"
            disabled={disabled}
            className={disabled && 'disabled'}
          >
            Search
          </StyledButtonSearch>
        </StyledForm>
      </header>
    );
  }
}

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
