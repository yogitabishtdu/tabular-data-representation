import React from "react";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

function SearchInput() {
  return (
    <div>
      <label htmlFor="search-input">Search your data here </label>
      <input id="search-input" type="text" placeholder="type author name" />
      <FaSearch />
    </div>
  );
}

export default SearchInput;
