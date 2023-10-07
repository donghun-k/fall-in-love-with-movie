export default interface Comment {
  id: number;
  movie_id: number;
  user_id: number;
  user_name: string;
  user_profile_image: string;
  rating: number;
  content: string;
  created_at: number;
  updated_at: number;
  isUpdated: boolean;
  likes: number;
}
