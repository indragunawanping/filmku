import { CommunicationState, ControlState, SessionState } from "./state";

export const initialCommunicationState: CommunicationState = {
  httpCalls: []
};

export const initialControlState: ControlState = {
  errorModal: {
    isOpen: false
  },
  currentTotalResults: 0,
  currentMovieList: [],
  currentMovieDetail: {
    title: "",
    year: "",
    rated: "",
    released:"",
    runtime: "",
    genre: "",
    director: "",
    writer: "",
    actors: "",
    plot: "",
    language: "",
    country: "",
    awards: "",
    poster: "",
    ratings: [],
    metascore: "",
    imdbRating: "",
    imdbVotes: "",
    imdbId: "",
    type: "",
    dvd: "",
    boxOffice: "",
    production: "",
    website: "",
  }
};

export const initialSessionState: SessionState = {
  isFetchingMovieList: false,
  isFetchingMovieDetail: false,
};
