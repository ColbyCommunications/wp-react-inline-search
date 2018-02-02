import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  position: relative;
  padding: 0.5rem;
  font-size: 1rem;
  color: #353535;
  color: var(--primary, #353535);
  cursor: pointer;
  background: transparent;
  border: 0;

  &:focus {
    background: rgba(white, 0.3);
  }
`;

export const SearchInput = ({ searchTerm, onChange }) => (
  <StyledInput
    style={{ cursor: 'pointer' }}
    value={searchTerm}
    onChange={onChange}
    type="search"
  />
);
