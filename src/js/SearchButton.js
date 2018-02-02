import React from 'react';
import styled from 'styled-components';

const StyledSearchButton = styled.button`
  position: absolute;
  top: 0.333rem;
  font-size: 1em;
  font-weight: 400;
  color: #353535;
  color: var(--black, #353535);
  text-transform: uppercase;
  pointer-events: ${({ searching }) => (searching ? 'none' : 'auto')};
  background: transparent;
  border: none;
  opacity: ${({ searching }) => (searching ? '0' : '1')};
`;

export const SearchButton = ({ searching }) => (
  <StyledSearchButton searching={searching} tabIndex="-1">
    Search
  </StyledSearchButton>
);
