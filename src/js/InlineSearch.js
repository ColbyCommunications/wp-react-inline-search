import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import enhanceWithClickOutside from 'react-click-outside';
import debounce from 'debounce';

import { Results } from './Results';
import { SearchButton } from './SearchButton';
import { SearchInput } from './SearchInput';

const QUERY_CACHE = {};

const StyledContainer = styled.div`
  position: relative;
`;

class InlineSearch extends React.Component {
  static propTypes = {
    searchEndpoint: PropTypes.string.isRequired,
    perPage: PropTypes.number,
  };

  static defaultProps = {
    perPage: 5,
  };

  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      results: [],
      showingResults: false,
      currentPage: 1,
      loading: false,
      totalPages: null,
    };
  }

  async componentDidUpdate(prevProps, prevState) {
    if (
      this.state.searchTerm !== prevState.searchTerm ||
      this.state.currentPage !== prevState.currentPage
    ) {
      await this.maybeResetToPageOne(prevState.searchTerm);
      this.maybeSearch();
    }
  }

  getSearchUrl = ({ searchTerm, currentPage }) =>
    `${
      this.props.searchEndpoint
    }?search=${searchTerm}&page=${currentPage}&per_page=${this.props.perPage}`;

  handleClickOutside() {
    this.closeSearch();
  }

  closeSearch() {
    this.setState({
      searchTerm: '',
      results: [],
      showingResults: false,
      currentPage: 1,
    });
  }

  maybeResetToPageOne = searchTerm =>
    new Promise(resolve => {
      if (searchTerm === this.state.searchTerm) {
        resolve();
        return;
      }

      this.setState({ currentPage: 1 }, resolve);
    });

  async maybeSearch({ searchTerm } = this.state) {
    if (searchTerm === '') {
      this.closeSearch();
      return;
    }

    this.setState({ loading: true }, () => this.search());
  }

  async search({ searchTerm, currentPage } = this.state) {
    const url = this.getSearchUrl({
      searchTerm,
      currentPage,
    });

    if (QUERY_CACHE[url]) {
      this.setState(Object.assign({}, QUERY_CACHE[url]));
      return;
    }

    const response = await fetch(url);
    const results = await response.json();

    const newState = {
      results,
      totalPages: response.headers.get('X-WP-TotalPages'),
      showingResults: true,
      loading: false,
    };

    QUERY_CACHE[url] = Object.assign({}, newState);
    this.setState(newState);
  }

  onSearchTermChange = event => {
    this.setState({ searchTerm: event.target.value });
  };

  onPageDown = () => {
    this.setState({ currentPage: this.state.currentPage - 1 });
  };

  onPageUp = () => {
    this.setState({ currentPage: this.state.currentPage + 1 });
  };

  render = (
    {
      searchTerm,
      showingResults,
      loading,
      totalPages,
      currentPage,
      results,
    } = this.state
  ) => (
    <StyledContainer>
      <SearchButton searching={searchTerm.length > 0} />
      <SearchInput searchTerm={searchTerm} onChange={this.onSearchTermChange} />
      <Results
        showingResults={showingResults}
        currentPage={currentPage}
        totalPages={totalPages}
        results={results}
        searchTerm={searchTerm}
        closeSearch={this.closeSearch}
        onPageDown={this.onPageDown}
        onPageUp={this.onPageUp}
        loading={loading}
      />
    </StyledContainer>
  );

  closeSearch = this.closeSearch.bind(this);
  onSearchTermChange = this.onSearchTermChange.bind(this);
  maybeSearch = debounce(this.maybeSearch.bind(this), 200);
  onPageDown = this.onPageDown.bind(this);
  onPageUp = this.onPageUp.bind(this);
}

export default enhanceWithClickOutside(InlineSearch);
