import Movie from '../models/Movie';
import MovieDetail from '../models/MovieDetail';

const { VITE_TMDB_ACCESS_TOKEN } = import.meta.env;

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

export const searchMovie = async ({ query, page = 1 }: SearchMovieParams) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${VITE_TMDB_ACCESS_TOKEN}`,
    },
  };

  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=true&language=ko-KR&page=${page}`,
    options
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
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${VITE_TMDB_ACCESS_TOKEN}`,
    },
  };
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
    options
  );
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
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${VITE_TMDB_ACCESS_TOKEN}`,
    },
  };
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/similar?language=ko-KR`,
    options
  );
  const json: GetSimilarMoviesResponse = await res.json();
  return json.results;
};
