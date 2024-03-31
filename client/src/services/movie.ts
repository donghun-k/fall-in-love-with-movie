import Movie from '../models/Movie';
import MovieDetail from '../models/MovieDetail';

const { VITE_SERVER_URL } = import.meta.env;

// SEARCH MOVIE
interface SearchMovieParams {
  query: string;
  page?: number;
}

export interface SearchMovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const searchMovie = async ({ query, page }: SearchMovieParams) => {
  const res = await fetch(
    `${VITE_SERVER_URL}/search/movie?query=${query}&page=${page}`,
  );
  const json: SearchMovieResponse = await res.json();
  return json;
};

// GET MOVIE DETAIL
interface GetMovieDetailParams {
  movieId: number;
}

export interface GetMovieDetailResponse extends MovieDetail {}

export const getMovieDetail = async ({ movieId }: GetMovieDetailParams) => {
  const res = await fetch(`${VITE_SERVER_URL}/movie/${movieId}`);
  const json: GetMovieDetailResponse = await res.json();
  return json;
};

// GET SIMILAR MOVIES
interface GetSimilarMoviesParams {
  movieId: number;
}

export interface GetSimilarMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const getSimilarMovies = async ({ movieId }: GetSimilarMoviesParams) => {
  const res = await fetch(`${VITE_SERVER_URL}/movie/${movieId}/similar`);
  const json: GetSimilarMoviesResponse = await res.json();
  return json.results;
};
