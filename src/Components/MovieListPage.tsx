import React, { FormEvent } from 'react';
import styles from './MovieListPage.module.css';
import { Movie } from "../state";
import posterNotAvailable from '../Assets/poster-not-available.webp';
import { Grid, Input, Loader, Pagination } from "semantic-ui-react";
import SearchBarContainer from "../Containers/SearchBarContainer";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";

interface MovieListPageProps {
  query: string;
  searchQuery: string;
  currentMovieList: Movie[];
  currentPage: number;
  totalPage: number;
  isFetchingMovieList: boolean;
  desiredPageNumber: number;
  isWarningVisible: boolean;
  handleSearchInputChange: (event: FormEvent<HTMLInputElement>) => void;
  handleEnterKeyDown: any;
  handleDetailButtonClick: (imdbId: string) => void;
  handlePageChange: (event: React.MouseEvent<HTMLAnchorElement>, data: object) => void;
  handlePageNumberInputChange: (event: FormEvent<HTMLInputElement>) => void;
  handlePageNumberEnterKeyDown: any;
  handleButtonGoClick: () => void;
}

const MovieListPage: React.FC<MovieListPageProps> = (props: MovieListPageProps) => {
  const renderMovieLabel = (movieType: string) => {
    let customColor: string;

    switch (movieType) {
      case "movie":
        customColor = '#E52D3F';
        break;
      case "series":
        customColor = '#F2C32B';
        break;
      default:
        customColor = '#481EE2';
    }

    let customStyle = {
      backgroundColor: customColor
    };

    return <span className={styles.MovieType} style={{ ...customStyle }}>{movieType}</span>
  };

  const renderMovieList = () => {
    let renderMovieList: JSX.Element[] = [];

    for (const movie of props.currentMovieList) {
      renderMovieList.push(
        <div className={styles.MovieContentContainer} key={movie.imdbId}>
          <div className={styles.PosterContainer}>
            {
              movie.poster === "N/A" ?
                <img className={styles.Poster} src={posterNotAvailable} alt=''/> :
                <img className={styles.Poster} src={movie.poster} alt=''/>
            }
          </div>
          {
            renderMovieLabel(movie.type)
          }
          <p className={styles.MovieTitle}>{movie.title}</p>
          <span className={styles.MovieYear}>{movie.year}</span>
          <button className={styles.DetailButton} onClick={() => props.handleDetailButtonClick(movie.imdbId)}>Detail
          </button>
        </div>
      )
    }

    return renderMovieList;
  };

  return (
    <div className={styles.MovieListPageContainer}>
      <SearchBarContainer/>
      {
        props.isFetchingMovieList ?
          <div className={styles.Loader}>
            <Loader active inline='centered'>Loading</Loader>
          </div>
          :
          <>
            <span className={styles.Title}>
              Movie list for: "{props.searchQuery}"
            </span>
            <Grid>
              <Grid.Row className={styles.MovieListContainer}>
                {renderMovieList()}
              </Grid.Row>
            </Grid>
            <Input className={styles.InputSearch} type='text' placeholder='Page number...' action>
              <input type="number" min="1"
                     onChange={props.handlePageNumberInputChange}
                     onKeyDown={props.handlePageNumberEnterKeyDown}
                     value={props.desiredPageNumber}
              />
              <Button type='submit' icon onClick={props.handleButtonGoClick}>Go</Button>
            </Input>
            <span className={styles.Warning} style={{ visibility: props.isWarningVisible ? "visible" : "hidden" }}>Please input page number in range only.</span>
            <div className={styles.Pagination}>
              <Pagination pointing
                          secondary
                          activePage={props.currentPage}
                          totalPages={props.totalPage}
                          onPageChange={props.handlePageChange}
              />
            </div>
          </>
      }
    </div>
  )
};

export default MovieListPage;
