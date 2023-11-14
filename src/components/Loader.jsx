import React from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import styled from 'styled-components';

export const Loader = () => {
  return (
    <LoaderContainer>
      <InfinitySpin width="200" color="rgb(43, 88, 236)" />
    </LoaderContainer>
  );
};

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
