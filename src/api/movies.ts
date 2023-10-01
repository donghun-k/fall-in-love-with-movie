const { VITE_TMDB_ACCESS_TOKEN } = import.meta.env;

interface SearchMovieParams {
  query: string;
  page?: number;
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
  const json = await res.json();
  console.log(json);
  return json;
};

searchMovie({ query: '안녕', page: 1 });
