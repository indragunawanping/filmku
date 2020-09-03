import { Movie, Rating } from "./state";

export const extractMovieList = (unformattedMovieList: any) => {
  let formattedMovieList: Movie[] = [];

  for (const movie of unformattedMovieList) {
    formattedMovieList.push({
        imdbId: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        type: movie.Type,
        poster: movie.Poster
      }
    )
  }

  return formattedMovieList;
};

export const extractRatings = (unformattedRatings: any) => {
  let formattedRatings: Rating[] = [];

  for(const rating of unformattedRatings) {
    formattedRatings.push(
      {
        source: rating.Source,
        value: rating.Value
      }
    )
  }

  return formattedRatings;
};

export const formatMovieDetail = (unformattedMovieDetail: any) => {
  return {
    title: unformattedMovieDetail.Title,
    year: unformattedMovieDetail.Year,
    rated: unformattedMovieDetail.Rated,
    released:unformattedMovieDetail.Released,
    runtime: unformattedMovieDetail.Runtime,
    genre: unformattedMovieDetail.Genre,
    director: unformattedMovieDetail.Director,
    writer: unformattedMovieDetail.Writer,
    actors: unformattedMovieDetail.Actors,
    plot: unformattedMovieDetail.Plot,
    language: unformattedMovieDetail.Language,
    country: unformattedMovieDetail.Country,
    awards: unformattedMovieDetail.Awards,
    poster: unformattedMovieDetail.Poster,
    ratings: extractRatings(unformattedMovieDetail.Ratings),
    metascore: unformattedMovieDetail.Metascore,
    imdbRating: unformattedMovieDetail.imdbRating,
    imdbVotes: unformattedMovieDetail.imdbVotes,
    imdbId: unformattedMovieDetail.imdbID,
    type: unformattedMovieDetail.Type,
    dvd: unformattedMovieDetail.DVD,
    boxOffice: unformattedMovieDetail.BoxOffice,
    production: unformattedMovieDetail.Production,
    website: unformattedMovieDetail.Website,
  };
};

