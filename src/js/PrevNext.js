import React from 'react';
import styled from 'styled-components';

const StyledPrevNext = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledPrevNextButton = styled.button`
  padding: 0.75rem;
  font-size: 150%;
  font-weight: bold;
  background: transparent;
  border: none;
`;

const StyledLoadingText = styled.div`
  font-size: 89.1%;
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
