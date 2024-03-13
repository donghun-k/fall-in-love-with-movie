import { Button, Typography } from '@mui/material';
import { useRef } from 'react';

import useCommentExpand from '../../../../../hooks/comment/useCommentExpand';

interface Prop {
  content: string;
}

const CommentContent = ({ content }: Prop) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const calculateIsOverflow = () =>
    (contentRef.current?.scrollHeight ?? 0) > 60;
  const { expand, isOverflow, handleExpand } = useCommentExpand({
    calculateIsOverflow,
  });
  return (
    <>
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
        whiteSpace="pre-wrap"
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
    </>
  );
};

export default CommentContent;
