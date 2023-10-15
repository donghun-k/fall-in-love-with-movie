export default interface Comment {
  movieId: number;
  authorId: string;
  username: string;
  userProfileImage: string;
  content: string;
  createdAt: number;
  updatedAt: number;
  isUpdated: boolean;
  rating: number;
  likes: string[];
  likeCount: number;
}
