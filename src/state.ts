export interface State {
  communication: CommunicationState;
  control: ControlState;
  session: SessionState;
}

export interface CommunicationState {
  httpCalls: HttpCall[];
}

export interface ControlState {
  currentTotalResults: number;
  currentMovieList: Movie[];
  currentMovieDetail: MovieDetail;
  errorModal: ErrorModalProps;
}

export interface SessionState {
  isFetchingMovieList: boolean;
  isFetchingMovieDetail: boolean;
}

export interface HttpCall {
  id: string;
  method: HttpCallMethod;
  url: string;
  headers?: HttpHeader;
  credentials?: RequestCredentials;
  mode?: RequestMode;
  requestBody?: string | any;
  status?: HttpCallStatus;
}

export enum HttpCallMethod {
  GET = "GET",
}

export interface HttpHeader {
  [key: string]: string;
}

export enum HttpCallStatus {
  SENT = "SENT",
  SUCCESSFUL = "SUCCESSFUL",
  ERROR = "ERROR"
}

export interface ErrorModalProps {
  isOpen: boolean;
  title?: string;
  content?: string | JSX.Element;
}

export interface Movie {
  imdbId: string,
  title: string,
  year: string,
  type: string,
  poster: string,
}

export interface MovieDetail {
  title: string,
  year: string,
  rated: string,
  released:string,
  runtime: string,
  genre: string,
  director: string,
  writer: string,
  actors: string,
  plot: string,
  language: string,
  country: string,
  awards: string,
  poster: string,
  ratings: Rating[],
  metascore: string,
  imdbRating: string,
  imdbVotes: string,
  imdbId: string,
  type: string,
  dvd: string,
  boxOffice: string,
  production: string,
  website: string,
}

export interface Rating {
  source: string,
  value: string
}






