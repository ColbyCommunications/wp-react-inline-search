# wp-react-inline-search

A React component displaying search results from a WordPress REST endpoint.

[Demo](https://colbycommunications.github.io/wp-react-inline-search/demo/).

## Install

```
npm install wp-react-inline-search
```

Or:

```
yarn add wp-react-inline-search
```

## Usage

### Example

```Javascript
import React from 'react';
import ReactDOM from 'react-dom';
import InlineSearch from 'wp-react-inline-search'

const restEndpoint = 'http://my-site.com/wp-json/wp/v2/posts/';
const myElement = document.querySelector('#my-element');

ReactDOM.render(<InlineSearch searchEndpoint={restEndpoint}>, myElement);
```

### Props

#### `searchEndpoint` {string} **required**

A WordPress REST endpoint to provide search results. If using a custom endpoint, it needs to handle `search`, `page`, and `per_page` REST parameters.

#### `perPage` {string|number} **default = 5**

The number of results to display per page.
