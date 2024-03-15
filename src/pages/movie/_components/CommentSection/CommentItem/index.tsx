import { Box, Divider } from '@mui/material';
import { ReactNode } from 'react';

import CommentContent from './CommentContent';
import CommentHeader from './CommentHeader';

interface Props {
  username: string;
  userProfileImage: string;
  createdAt: number;
  isUpdated: boolean;
  rating: number | null;
  content: string;
  commentActions: ReactNode;
  type?: 'myComment' | 'otherComment';
}

const CommentItem = ({
  username,
  userProfileImage,
  createdAt,
  isUpdated,
  rating,
  content,
  commentActions,
  type = 'otherComment',
}: Props) => {
  return (
    <Box
      width="100%"
      height="fit-content"
      padding="10px"
      bgcolor={type === 'myComment' ? 'background.paper' : 'transparent'}
      borderRadius="10px"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        width="100%"
        height="fit-content"
      >
        <CommentHeader
          username={username}
          userProfileImage={userProfileImage}
          createdAt={createdAt}
          isUpdated={isUpdated}
          rating={rating}
        />
        <Divider
          sx={{
            width: '100%',
            margin: '10px 0',
          }}
        />
        <CommentContent content={content} />
        <Divider
          sx={{
            width: '100%',
            margin: '10px 0',
          }}
        />
        {commentActions}
      </Box>
    </Box>
  );
};

export default CommentItem;
