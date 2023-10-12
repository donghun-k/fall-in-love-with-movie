export default interface Comment {
  movieId: number;
  userId: string;
  username: string;
  userProfileImage: string;
  rating: number;
  content: string;
  createdAt: number;
  updatedAt: number;
  isUpdated: boolean;
  likes: number;
}
