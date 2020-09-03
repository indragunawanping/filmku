import React, { useEffect } from 'react';
import MovieDetailPage from "../Components/MovieDetailPage";
import { MovieDetail, State } from "../state";
import { connect, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router";
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

  const currentMovieDetail = props.currentMovieDetail;
  const isFetchingMovieDetail = props.isFetchingMovieDetail;

  const urlParams = props.match.params;
  const imdbId = urlParams.imdbId;

  useEffect(() => {
    dispatch(fetchMovieDetail(imdbId));
  }, [dispatch, imdbId]);

  return (
    <MovieDetailPage currentMovieDetail={currentMovieDetail}
                     isFetchingMovieDetail={isFetchingMovieDetail}
    />
  )
};

export default connect(mapStateToProps)(MovieDetailPageContainer);
