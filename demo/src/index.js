import React from "react";
import ReactDOM from "react-dom";

import InlineSearch from "../..";

window.addEventListener("load", () => {
  const root = document.querySelector("[data-inline-search]");

  if (!root) {
    return;
  }

  const searchEndpoint = root.getAttribute("data-search-endpoint");
  if (searchEndpoint) {
    ReactDOM.render(<InlineSearch searchEndpoint={searchEndpoint} />, root);
  }
});
