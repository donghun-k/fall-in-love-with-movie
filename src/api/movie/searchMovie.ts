import Movie from '../../types/Movie';

const { VITE_TMDB_ACCESS_TOKEN } = import.meta.env;

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

const searchMovie = async ({ query, page = 1 }: SearchMovieParams) => {
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

export default searchMovie;
