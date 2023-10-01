import Movie from './Movie';

export default interface MovieList {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
