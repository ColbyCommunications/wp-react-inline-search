import React from 'react';
import styled from 'styled-components';

const StyledPrevNext = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  clear: both;
`;

const StyledPrevNextButton = styled.button`
  padding: 0.75rem;
  font-size: 1.5rem;
  font-weight: bold;
  background: transparent;
  border: none;

  &:first-of-type {
    padding: 1.5rem;
  }

  &:focus,
  &:hover {
    text-decoration: none;
  }
`;

const StyledLoadingText = styled.div`
  font-size: 0.891em;
`;

export const PrevNext = ({
  currentPage,
  loading,
  onPageDown,
  onPageUp,
  totalPages,
}) => (
  <StyledPrevNext>
    <StyledPrevNextButton
      dangerouslySetInnerHTML={{
        __html: currentPage > 1 ? '&laquo;' : '',
      }}
      tabIndex={currentPage > 1 ? 0 : -1}
      style={currentPage < 2 ? { pointerEvents: 'none', outline: 'none' } : {}}
      onClick={onPageDown}
    />
    <StyledLoadingText>
      {loading === true ? 'Loading ...' : ''}
    </StyledLoadingText>
    <StyledPrevNextButton
      style={
        currentPage >= totalPages
          ? { pointerEvents: 'none', outline: 'none' }
          : {}
      }
      tabIndex={currentPage <= totalPages ? 0 : -1}
      dangerouslySetInnerHTML={{
        __html: currentPage < totalPages ? '&raquo;' : '',
      }}
      onClick={onPageUp}
    />
  </StyledPrevNext>
);
