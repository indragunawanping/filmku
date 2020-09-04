import React from 'react';
import { MovieDetail } from "../state";
import styles from './MovieDetailPage.module.css';
import SearchBarContainer from "../Containers/SearchBarContainer";
import logoIMDb from '../Assets/logo-20-IMDb.webp';
import { Loader } from "semantic-ui-react";

interface MovieDetailPageProps {
  currentMovieDetail: MovieDetail;
  isFetchingMovieDetail: boolean;
  handleButtonBackClick: () => void;
}

const MovieDetailPage: React.FC<MovieDetailPageProps> = (props: MovieDetailPageProps) => {
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

  const renderRatings = () => {
    let ratingsElements: JSX.Element[] = [];

    for (const rating of props.currentMovieDetail.ratings) {
      ratingsElements.push(
        <div className={styles.Ratings}>
          <span className={styles.Source}>{rating.source}:</span>
          <span> {rating.value}</span>
        </div>
      )
    }

    return ratingsElements;
  };

  return (
    <div className={styles.MovieDetailContainer}>
      <SearchBarContainer/>
      {
        props.isFetchingMovieDetail ?
          <div className={styles.Loader}>
            <Loader active inline='centered'>Loading</Loader>
          </div> :
          <div className={styles.MovieDetailContentContainerColumn}>
            <div className={styles.MovieDetailContentContainerRow}>
              <img className={styles.Poster} src={props.currentMovieDetail.poster} alt=''/>
              <div className={styles.MovieDetailContent}>
                <div className={styles.TitleLine}>
                  <span className={styles.Title}>{props.currentMovieDetail.title}</span>
                  {
                    renderMovieLabel(props.currentMovieDetail.type)
                  }
                </div>
                <div className={styles.PlotContainer}>
                  <span className={styles.Plot}>{props.currentMovieDetail.plot}</span>
                </div>
                <div className={styles.DetailLine}>
                  <span className={styles.Detail}>Year</span>
                  <span className={styles.DetailContent}>{props.currentMovieDetail.year}</span>
                </div>
                <div className={styles.DetailLine}>
                  <span className={styles.Detail}>Rated</span>
                  <span className={styles.DetailContent}>{props.currentMovieDetail.rated}</span>
                </div>
                <div className={styles.DetailLine}>
                  <span className={styles.Detail}>Released</span>
                  <span className={styles.DetailContent}>{props.currentMovieDetail.released}</span>
                </div>
                <div className={styles.DetailLine}>
                  <span className={styles.Detail}>Run Time</span>
                  <span className={styles.DetailContent}>{props.currentMovieDetail.runtime}</span>
                </div>
                <div className={styles.DetailLine}>
                  <span className={styles.Detail}>Genre</span>
                  <span className={styles.DetailContent}>{props.currentMovieDetail.genre}</span>
                </div>
                <div className={styles.DetailLine}>
                  <span className={styles.Detail}>Director</span>
                  <span className={styles.DetailContent}>{props.currentMovieDetail.director}</span>
                </div>
                <div className={styles.DetailLine}>
                  <span className={styles.Detail}>Writer</span>
                  <span className={styles.DetailContent}>{props.currentMovieDetail.writer}</span>
                </div>
                <div className={styles.DetailLine}>
                  <span className={styles.Detail}>Actors</span>
                  <span className={styles.DetailContent}>{props.currentMovieDetail.actors}</span>
                </div>
                <div className={styles.DetailLine}>
                  <span className={styles.Detail}>Language</span>
                  <span className={styles.DetailContent}>{props.currentMovieDetail.language}</span>
                </div>
                <div className={styles.DetailLine}>
                  <span className={styles.Detail}>Country</span>
                  <span className={styles.DetailContent}>{props.currentMovieDetail.country}</span>
                </div>
                <div className={styles.DetailLine}>
                  <span className={styles.Detail}>Awards</span>
                  <span className={styles.DetailContent}>{props.currentMovieDetail.awards}</span>
                </div>
                <div className={styles.DetailLine}>
                  <span className={styles.Detail}>Ratings</span>
                  <span className={styles.DetailContent}>
                    {
                      renderRatings()
                    }
                  </span>
                </div>
                <div className={styles.DetailLine}>
                  <span className={styles.Detail}>Meta Score</span>
                  <span className={styles.DetailContent}>{props.currentMovieDetail.metascore}</span>
                </div>
                <div className={styles.DetailLine}>
            <span className={styles.Detail}>
              <img className={styles.MiniImage} src={logoIMDb} alt=''/>
              <span> Rating</span>
            </span>
                  <span className={styles.DetailContent}>{props.currentMovieDetail.imdbRating}</span>
                </div>
                <div className={styles.DetailLine}>
            <span className={styles.Detail}>
              <img className={styles.MiniImage} src={logoIMDb} alt=''/>
              <span> Votes</span>
            </span>
                  <span className={styles.DetailContent}>{props.currentMovieDetail.imdbVotes}</span>
                </div>
                <div className={styles.DetailLine}>
                  <span className={styles.Detail}>DVD</span>
                  <span className={styles.DetailContent}>{props.currentMovieDetail.dvd}</span>
                </div>
                <div className={styles.DetailLine}>
                  <span className={styles.Detail}>Box Office</span>
                  <span className={styles.DetailContent}>{props.currentMovieDetail.boxOffice}</span>
                </div>
                <div className={styles.DetailLine}>
                  <span className={styles.Detail}>Production</span>
                  <span className={styles.DetailContent}>{props.currentMovieDetail.production}</span>
                </div>
                <div className={styles.DetailLine}>
                  <span className={styles.Detail}>Website</span>
                  <span className={styles.DetailContent}>{props.currentMovieDetail.website}</span>
                </div>
              </div>
            </div>
            <div>
              <button className={styles.ButtonBack} onClick={props.handleButtonBackClick}>Back</button>
            </div>
          </div>
      }
    </div>
  )
};

export default MovieDetailPage;
