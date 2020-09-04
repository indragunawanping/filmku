import React, { useEffect } from 'react';
import MovieDetailPage from "../Components/MovieDetailPage";
import { MovieDetail, State } from "../state";
import { connect, useDispatch } from "react-redux";
import { RouteComponentProps, useHistory } from "react-router";
import { fetchMovieDetail } from "../actionsMovie";

interface MovieDetailPageContainerProps extends RouteComponentProps<any> {
  currentMovieDetail: MovieDetail;
  isFetchingMovieDetail: boolean;
}

const mapStateToProps = (state: State) => {
  return {
    currentMovieDetail: state.control.currentMovieDetail,
    isFetchingMovieDetail: state.session.isFetchingMovieDetail
  }
};

const MovieDetailPageContainer: React.FC<MovieDetailPageContainerProps> = (props: MovieDetailPageContainerProps) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const currentMovieDetail = props.currentMovieDetail;
  const isFetchingMovieDetail = props.isFetchingMovieDetail;

  const urlParams = props.match.params;
  const imdbId = urlParams.imdbId;

  useEffect(() => {
    dispatch(fetchMovieDetail(imdbId));
  }, [dispatch, imdbId]);

  const handleButtonBackClick = () => {
    history.goBack();
  };

  return (
    <MovieDetailPage currentMovieDetail={currentMovieDetail}
                     isFetchingMovieDetail={isFetchingMovieDetail}
                     handleButtonBackClick={handleButtonBackClick}
    />
  )
};

export default connect(mapStateToProps)(MovieDetailPageContainer);
