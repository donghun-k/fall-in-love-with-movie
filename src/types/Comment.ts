import { DocumentReference } from 'firebase/firestore';

export default interface Comment {
  movieId: number;
  movieTitle: string;
  authorId: string;
  username: string;
  userProfileImage: string;
  content: string;
  createdAt: number;
  updatedAt: number;
  isUpdated: boolean;
  rating: number | null;
  likes: string[];
  likeCount: number;
  commentRef: DocumentReference;
}
