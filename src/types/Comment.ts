export default interface Comment {
  movieId: number;
  userId: string;
  username: string;
  userProfileImage: string;
  content: string;
  createdAt: number;
  updatedAt: number;
  isUpdated: boolean;
  likes: number;
  rating: number;
}
