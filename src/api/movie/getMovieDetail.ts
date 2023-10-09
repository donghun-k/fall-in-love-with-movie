import MovieDetail from '../../types/MovieDetail';

const { VITE_TMDB_ACCESS_TOKEN } = import.meta.env;

interface getMovieDetailParams {
  movieId: number;
}

export interface getMovieDetailResponse extends MovieDetail {}

const getMovieDetail = async ({ movieId }: getMovieDetailParams) => {
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

export default getMovieDetail;
