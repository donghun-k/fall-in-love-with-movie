import Comment from '../../../../../models/Comment';
import CommentItem from '../CommentItem';
import CommentActions from './CommentActions';

interface Props {
  movieId: number;
  myComment: Comment;
  handleOpenDialog: () => void;
}

const MyCommentItem = ({ movieId, myComment, handleOpenDialog }: Props) => {
  const { username, userProfileImage, createdAt, isUpdated, rating, content } =
    myComment;
  return (
    <CommentItem
      username={username}
      userProfileImage={userProfileImage}
      createdAt={createdAt}
      isUpdated={isUpdated}
      rating={rating}
      content={content}
      type="myComment"
    >
      <CommentActions
        movieId={movieId}
        myComment={myComment}
        handleOpenDialog={handleOpenDialog}
      />
    </CommentItem>
  );
};

export default MyCommentItem;
