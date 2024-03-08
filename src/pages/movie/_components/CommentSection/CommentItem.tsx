import { Avatar, Box, Button, Chip, Divider, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { ReactNode } from 'react';

import { convertTimestampToDateString } from '../../../../utils/date';
import useCommentExpand from '../../../../hooks/comment/useCommentExpand';

interface Props {
  username: string;
  userProfileImage: string;
  createdAt: number;
  isUpdated: boolean;
  rating: number | null;
  content: string;
  children: ReactNode;
  type?: 'myComment' | 'otherComment';
}

const CommentItem = ({
  username,
  userProfileImage,
  createdAt,
  isUpdated,
  rating,
  content,
  children,
  type = 'otherComment',
}: Props) => {
  const { expand, isOverflow, contentRef, handleExpand } = useCommentExpand();
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
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          height="40px"
        >
          <Box
            display="flex"
            flexDirection="row"
            alignContent="center"
            gap="10px"
          >
            <Avatar
              src={userProfileImage}
              alt={username}
              sx={{
                width: '40px',
                height: '40px',
              }}
            />
            <Box>
              <Typography
                display="flex"
                flexDirection="row"
                alignItems="flex-end"
                fontSize={{ xs: '0.8rem', sm: '1rem' }}
                gap="5px"
              >
                {username}
              </Typography>
              <Typography
                fontSize={{ xs: '0.6rem', sm: '0.8rem' }}
                color="text.secondary"
              >
                {convertTimestampToDateString(createdAt)}
                {isUpdated && ' (수정됨)'}
              </Typography>
            </Box>
          </Box>
          {Boolean(rating) && (
            <Chip icon={<StarIcon />} label={rating} size="small" />
          )}
        </Box>
        <Divider
          sx={{
            width: '100%',
            margin: '10px 0',
          }}
        />
        <Typography
          ref={contentRef}
          width="100%"
          height="fit-content"
          maxHeight={expand ? 'none' : '60px'}
          lineHeight="20px"
          fontSize={{ xs: '0.8rem', sm: '1rem' }}
          color="text.secondary"
          overflow="hidden"
          paddingRight="5px"
          sx={{
            ...(!expand && {
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }),
          }}
        >
          {content}
        </Typography>
        {isOverflow && (
          <Button
            sx={{
              minWidth: 'fit-content',
              padding: '5px 0',
              fontSize: { xs: '0.8rem', sm: '1rem' },
            }}
            onClick={handleExpand}
          >
            {expand ? '접기' : '자세히 보기'}
          </Button>
        )}
        <Divider
          sx={{
            width: '100%',
            margin: '10px 0',
          }}
        />
        {children}
      </Box>
    </Box>
  );
};

export default CommentItem;
