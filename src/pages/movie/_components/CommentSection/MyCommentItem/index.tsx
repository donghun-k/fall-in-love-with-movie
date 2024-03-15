import Comment from '../../../../../models/Comment';
import CommentItem from '../CommentItem';
import MyCommentActions from './MyCommentActions';

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
      commentActions={
        <MyCommentActions
          movieId={movieId}
          myComment={myComment}
          handleOpenDialog={handleOpenDialog}
        />
      }
    />
  );
};

export default MyCommentItem;
