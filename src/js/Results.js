import React from 'react';
import styled from 'styled-components';

import { Result } from './result';
import { PrevNext } from './PrevNext';

const StyledResults = styled.div`
  position: absolute;
  top: 2.5em;
  right: 0;
  display: ${({ showingResults }) => (showingResults ? 'block' : 'none')};
  width: 320px;
  padding-top: 1.5em;
  padding-left: 0;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border: 1px solid var(--border-color, rgba(0, 0, 0, 0.15));
  border-radius: 2px;

  h3 {
    margin-bottom: 1rem;
    line-height: 1.2;

    @media screen and (min-width: 768px) {
      padding-left: 1.5rem;
    }
  }

  @media screen and (max-width: 767px) {
    position: static;
    width: auto;
    padding: 2.25em 0 0;
    border: 0;
  }
`;

const StyledCloseButton = styled.button`
  position: absolute;
  top: -0.75rem;
  right: 0;
  font-size: 2.828em !important;
  line-height: 1;
  background: transparent;
  border: none;

  @media screen and (min-width: 768px) {
    right: 0.25em;
  }

  &:hover {
    text-decoration: none;
  }
`;

export const Results = ({
  showingResults,
  currentPage,
  totalPages,
  results,
  searchTerm,
  loading,
  closeSearch,
  onPageDown,
  onPageUp,
}) => (
  <StyledResults showingResults={showingResults}>
    <h3>
      Search Results
      {totalPages > 1 ? ` (Page ${currentPage} of ${totalPages})` : ''}
    </h3>
    <StyledCloseButton
      dangerouslySetInnerHTML={{ __html: '&Cross;' }}
      onClick={closeSearch}
    />
    {results.length > 0 ? (
      results
        .filter(result => result.title && result.title.rendered.length)
        .map(result => <Result key={result.id} {...result} />)
    ) : (
      <span className="no-results">No results.</span>
    )}
    <PrevNext
      currentPage={currentPage}
      onPageDown={onPageDown}
      onPageUp={onPageUp}
      totalPages={totalPages}
      loading={loading}
    />
  </StyledResults>
);
