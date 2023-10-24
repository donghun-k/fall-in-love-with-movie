export default interface Rating {
  movieGenreIds: number[];
  movieId: number;
  movieTitle: string;
  rating: number;
  userId: string;
  ratedAt: number;
}
