import React, { FormEvent, useState } from 'react';
import SearchBar from "../Components/SearchBar";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { fetchMovieList } from "../actionsMovie";

const SearchBarContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [query, setQuery] = useState("");

  let yearRange: any[] = [];

  for (let year = 1895; year <= 2020; year++) {
    yearRange.push(
      {
        key: year,
        text: year,
        value: year
      }
    )
  }

  const handleLogoClick = () => {
    history.push('/');
  };

  const successfulRedirection = () => {
    history.push('/movie-list/'.concat(query).concat('/').concat(String(1)));
  };

  const handleSearchInputChange = (event: FormEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value);
  };

  const handleEnterKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      dispatch(fetchMovieList(query, String(1), successfulRedirection));
    }
  };

  const handleButtonSearchClick = () => {
    dispatch(fetchMovieList(query, String(1), successfulRedirection));
  };

  return (
    <SearchBar query={query}
               yearRange={yearRange}
               handleLogoClick={handleLogoClick}
               handleSearchInputChange={handleSearchInputChange}
               handleEnterKeyDown={handleEnterKeyDown}
               handleButtonSearchClick={handleButtonSearchClick}
    />
  )
};

export default SearchBarContainer;
