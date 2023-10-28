import React from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import styled from 'styled-components';

export const Loader = () => {
  return (
    <LoaderContainer>
      <InfinitySpin width="200" color="rgb(61, 106, 255)" />
    </LoaderContainer>
  );
};

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
