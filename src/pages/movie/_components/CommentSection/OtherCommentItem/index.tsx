import { User } from 'firebase/auth';

import Comment from '../../../../../models/Comment';
import { UpdateLikesOptimisticallyFn } from '../../../../../hooks/comment/useCommentsInfiniteQuery';
import Likes from './Likes';
import CommentItem from '../CommentItem';
interface Props {
  user: User | null;
  comment: Comment;
  updateLikesOptimistically: UpdateLikesOptimisticallyFn;
}

const OtherCommentItem = ({
  user,
  comment,
  updateLikesOptimistically,
}: Props) => {
  const { username, userProfileImage, createdAt, isUpdated, rating, content } =
    comment;

  return (
    <CommentItem
      username={username}
      userProfileImage={userProfileImage}
      createdAt={createdAt}
      isUpdated={isUpdated}
      rating={rating}
      content={content}
    >
      <Likes
        user={user}
        comment={comment}
        updateLikesOptimistically={updateLikesOptimistically}
      />
    </CommentItem>
  );
};

export default OtherCommentItem;