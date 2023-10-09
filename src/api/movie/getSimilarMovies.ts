import Movie from '../../types/Movie';

const { VITE_TMDB_ACCESS_TOKEN } = import.meta.env;

interface getSimilarMoviesParams {
  movieId: number;
}

export interface getSimilarMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const getSimilarMovies = async ({ movieId }: getSimilarMoviesParams) => {
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

export default getSimilarMovies;
