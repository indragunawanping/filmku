import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { ErrorModalProps, HttpCall, HttpCallMethod, HttpCallStatus, Movie, MovieDetail } from "./state";
import { addNewHttpCall, sendHttpRequest, updateHttpCallStatus } from "./actionsHttp";
import { API_KEY, REACT_APP_APPLICATION_BASE_URL } from "./config";
import * as uuid from "uuid";
import { updateErrorModalStatus } from "./actions";
import { extractMovieList, formatMovieDetail } from './responseUtil';

export const UPDATE_CURRENT_TOTAL_RESULTS = "UPDATE_CURRENT_TOTAL_RESULTS";
export const UPDATE_CURRENT_MOVIE_LIST = "UPDATE_CURRENT_MOVIE_LIST";
export const UPDATE_CURRENT_MOVIE_DETAIL = "UPDATE_CURRENT_MOVIE_DETAIL";

export const UPDATE_FETCHING_MOVIE_LIST_STATUS = "UPDATE_FETCHING_MOVIE_LIST_STATUS";
export const UPDATE_FETCHING_MOVIE_DETAIL_STATUS = "UPDATE_FETCHING_MOVIE_DETAIL_STATUS";

const updateFetchingMovieListStatus = (isFetchingMovieList: boolean) => {
  return {
    type: UPDATE_FETCHING_MOVIE_LIST_STATUS, payload: isFetchingMovieList
  }
};

const updateFetchingMovieDetailStatus = (isFetchingMovieDetail: boolean) => {
  return {
    type: UPDATE_FETCHING_MOVIE_DETAIL_STATUS, payload: isFetchingMovieDetail
  }
};

const updateCurrentTotalResults = (totalResults: number) => {
  return {
    type: UPDATE_CURRENT_TOTAL_RESULTS, payload: totalResults
  }
};

const updateCurrentMovieList = (searchResults: Movie[]) => {
  return {
    type: UPDATE_CURRENT_MOVIE_LIST, payload: searchResults
  }
};

const updateCurrentMovieDetail = (movieDetail: MovieDetail) => {
  return {
    type: UPDATE_CURRENT_MOVIE_DETAIL, payload: movieDetail
  }
};

export const fetchMovieList = (query: string, page: string, successfulRedirection?: () => void) => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const REACT_APP_APPLICATION_MOVIE_LIST_URL = "?apikey=".concat(API_KEY).concat("&s=").concat(query).concat("&page=").concat(page);
    const url = REACT_APP_APPLICATION_BASE_URL + REACT_APP_APPLICATION_MOVIE_LIST_URL;
    const newCallId = uuid.v4();
    const httpCall: HttpCall = {
      id: newCallId,
      method: HttpCallMethod.GET,
      url: url,
    };

    let errorModalStatus: ErrorModalProps = {
      isOpen: true,
      title: "Unable to retrieve Movie List."
    };

    const successfulAction = (response: Response) => {
      if (response.body) {
        response.json()
          .then((data) => {
            if (data.Response === 'True') {
              dispatch(updateHttpCallStatus(newCallId, HttpCallStatus.SUCCESSFUL));
              dispatch(updateCurrentTotalResults(data.totalResults));
              dispatch(updateCurrentMovieList(extractMovieList(data.Search)));
              dispatch(updateFetchingMovieListStatus(false));
              if (successfulRedirection) successfulRedirection();
            } else {
              errorModalStatus.content = data.Error;
              dispatch(updateFetchingMovieListStatus(false));
              dispatch(updateErrorModalStatus(errorModalStatus));
            }
          });
      }
    };

    const failedAction = (response: Response) => {
      dispatch(updateHttpCallStatus(newCallId, HttpCallStatus.ERROR));
      if (response.body) {
        response.json()
          .then((data) => {
            errorModalStatus.content = data.message;
            dispatch(updateFetchingMovieListStatus(false));
            dispatch(updateErrorModalStatus(errorModalStatus));
            return;
          })
          .catch((error: Error) => {
            errorModalStatus.content = error.message;
            dispatch(updateFetchingMovieListStatus(false));
            dispatch(updateErrorModalStatus(errorModalStatus));
            return;
          });
      } else {
        errorModalStatus.content = "Unable to retrieve Movie List. Please contact developer.";
      }
      dispatch(updateFetchingMovieListStatus(false));
      if (errorModalStatus.content) {
        dispatch(updateErrorModalStatus(errorModalStatus));
      }
    };
    dispatch(updateFetchingMovieListStatus(true));
    sendHttpRequest(httpCall, successfulAction, failedAction);
    const httpCallSent = Object.assign({}, httpCall, {
      status: HttpCallStatus.SENT
    });
    dispatch(addNewHttpCall(httpCallSent));
  };
};

export const fetchMovieDetail = (imdbId: string, successfulRedirection?: () => void) => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const REACT_APP_APPLICATION_MOVIE_DETAIL_URL = "?i=".concat(imdbId).concat("&plot=full").concat("&apikey=").concat(API_KEY);
    const url = REACT_APP_APPLICATION_BASE_URL + REACT_APP_APPLICATION_MOVIE_DETAIL_URL;
    const newCallId = uuid.v4();
    const httpCall: HttpCall = {
      id: newCallId,
      method: HttpCallMethod.GET,
      url: url,
    };

    let errorModalStatus: ErrorModalProps = {
      isOpen: true,
      title: "Unable to retrieve Movie Detail."
    };

    const successfulAction = (response: Response) => {
      if (response.body) {
        response.json()
          .then((data) => {
            dispatch(updateHttpCallStatus(newCallId, HttpCallStatus.SUCCESSFUL));
            dispatch(updateCurrentMovieDetail(formatMovieDetail(data)));
            dispatch(updateFetchingMovieDetailStatus(false));
            if (successfulRedirection) successfulRedirection();
          });
      }
    };

    const failedAction = (response: Response) => {
      dispatch(updateHttpCallStatus(newCallId, HttpCallStatus.ERROR));
      if (response.body) {
        response.json()
          .then((data) => {
            errorModalStatus.content = data.message;
            dispatch(updateFetchingMovieDetailStatus(false));
            dispatch(updateErrorModalStatus(errorModalStatus));
            return;
          })
          .catch((error: Error) => {
            errorModalStatus.content = error.message;
            dispatch(updateFetchingMovieDetailStatus(false));
            dispatch(updateErrorModalStatus(errorModalStatus));
            return;
          });
      } else {
        errorModalStatus.content = "Unable to retrieve Movie Detail. Please contact developer.";
      }
      dispatch(updateFetchingMovieDetailStatus(false));
      if (errorModalStatus.content) {
        dispatch(updateErrorModalStatus(errorModalStatus));
      }
    };
    dispatch(updateFetchingMovieDetailStatus(true));
    sendHttpRequest(httpCall, successfulAction, failedAction);
    const httpCallSent = Object.assign({}, httpCall, {
      status: HttpCallStatus.SENT
    });
    dispatch(addNewHttpCall(httpCallSent));
  };
};
