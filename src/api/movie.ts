import Movie from '../types/Movie';
import MovieDetail from '../types/MovieDetail';

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
  // console.log(json);
  return json;
};

// GET MOVIE DETAIL
interface getMovieDetailParams {
  movieId: number;
}

export interface getMovieDetailResponse extends MovieDetail {}

export const getMovieDetail = async ({ movieId }: getMovieDetailParams) => {
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
  const json: getMovieDetailResponse = await res.json();
  return json;
};

// GET SIMILAR MOVIES
interface getSimilarMoviesParams {
  movieId: number;
}

export interface getSimilarMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const getSimilarMovies = async ({ movieId }: getSimilarMoviesParams) => {
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
  const json: getSimilarMoviesResponse = await res.json();
  return json.results;
};
