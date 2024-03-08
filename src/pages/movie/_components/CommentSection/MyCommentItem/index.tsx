import MyComment from '../../../../../models/MyComment';
import CommentItem from '../CommentItem';
import CommentActions from './CommentActions';

interface Props {
  movieId: number;
  myComment: MyComment;
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
