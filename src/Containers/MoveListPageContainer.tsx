import React, { FormEvent, useEffect, useState } from 'react';
import MovieListPage from "../Components/MovieListPage";
import { Movie, State } from "../state";
import { connect, useDispatch } from "react-redux";
import { RouteComponentProps, useHistory } from "react-router";
import { fetchMovieDetail, fetchMovieList } from "../actionsMovie";

export interface MovieListPageContainerProps extends RouteComponentProps<any> {
  currentMovieList: Movie[];
  currentTotalResults: number;
  isFetchingMovieList: boolean;
}

const mapStateToProps = (state: State) => {
  return {
    currentMovieList: state.control.currentMovieList,
    currentTotalResults: state.control.currentTotalResults,
    isFetchingMovieList: state.session.isFetchingMovieList
  }
};

const MovieListPageContainer: React.FC<MovieListPageContainerProps> = (props: MovieListPageContainerProps) => {
  const currentMovieList = props.currentMovieList;
  const dispatch = useDispatch();
  const history = useHistory();

  const urlParams = props.match.params;
  const searchQuery = urlParams.searchQuery;
  const pageNumber = urlParams.pageNumber;

  const isFetchingMovieList = props.isFetchingMovieList;
  const totalPage = Math.floor(props.currentTotalResults / 10);

  const [query, setQuery] = useState("");
  const [desiredPageNumber, setDesiredPageNumber] = useState(1);
  const [isWarningVisible, setIsWarningVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchMovieList(searchQuery, pageNumber));
    setCurrentPage(currentPage);
    setDesiredPageNumber(currentPage);
    setIsWarningVisible(false);
  }, [dispatch, searchQuery, pageNumber, currentPage]);

  const successfulRedirection = () => {
    history.push('/movie-list/'.concat(query).concat('/').concat(String(currentPage)));
  };

  const successfulChangePageRedirection = (activePage: number) => {
    history.push('/movie-list/'.concat(searchQuery).concat('/').concat(String(activePage)));
    setCurrentPage(activePage);
    setDesiredPageNumber(activePage);
  };

  const handleSearchInputChange = (event: FormEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value);
  };

  const handleEnterKeyDownProps = (event: any) => {
    if (event.key === 'Enter') {
      dispatch(fetchMovieList(query, String(currentPage), successfulRedirection));
    }
  };

  const handleDetailButtonClick = (imdbId: string) => {
    const successfulRedirection = () => {
      history.push('/movie-detail/'.concat(imdbId));
    };

    dispatch(fetchMovieDetail(imdbId, successfulRedirection))
  };

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPage) {
      setIsWarningVisible(true)
    } else {
      // @ts-ignore
      dispatch(fetchMovieList(searchQuery, String(pageNumber), successfulChangePageRedirection(pageNumber)));
      setIsWarningVisible(false);
    }
  };

  const handlePageNumberInputChange = (event: FormEvent<HTMLInputElement>) => {
    setDesiredPageNumber(parseInt(event.currentTarget.value));
  };

  const handlePageNumberEnterKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      if (desiredPageNumber < 1 || desiredPageNumber > totalPage) {
        setIsWarningVisible(true)
      } else {
        // @ts-ignore
        dispatch(fetchMovieList(searchQuery, String(desiredPageNumber), successfulChangePageRedirection(desiredPageNumber)));
        setIsWarningVisible(false);
      }
    }
  };

  return (
    <MovieListPage query={query}
                   searchQuery={searchQuery}
                   currentMovieList={currentMovieList}
                   currentPage={currentPage}
                   totalPage={totalPage}
                   isFetchingMovieList={isFetchingMovieList}
                   desiredPageNumber={desiredPageNumber}
                   isWarningVisible={isWarningVisible}
                   handleSearchInputChange={handleSearchInputChange}
                   handleEnterKeyDown={handleEnterKeyDownProps}
                   handleDetailButtonClick={handleDetailButtonClick}
                   handlePageChange={handlePageChange}
                   handlePageNumberInputChange={handlePageNumberInputChange}
                   handlePageNumberEnterKeyDown={handlePageNumberEnterKeyDown}
    />
  )
};

export default connect(mapStateToProps)(MovieListPageContainer);
