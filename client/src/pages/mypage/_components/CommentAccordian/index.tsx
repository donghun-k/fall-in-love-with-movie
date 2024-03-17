import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  List,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { MouseEvent, ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Comment from '../../../../models/Comment';
import CommentListItem from './CommentListItem';

interface Props {
  myComments: Comment[];
}

type SortOption = '최신순' | '등록순' | '가나다순';

const CommentAccordian = ({ myComments }: Props) => {
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState<SortOption>('가나다순');
  const [page, setPage] = useState(1);
  const [sortedComments, setSortedComments] = useState<Comment[]>([]);

  useEffect(() => {
    const sortedComments = [...myComments];
    if (sortOption === '가나다순') {
      sortedComments.sort((a, b) => {
        return a.movieTitle.localeCompare(b.movieTitle);
      });
    } else if (sortOption === '최신순') {
      sortedComments.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });
    } else if (sortOption === '등록순') {
      sortedComments.sort((a, b) => {
        return a.createdAt - b.createdAt;
      });
    }

    setSortedComments(sortedComments);
  }, [sortOption, page, myComments]);

  const handleSetPage = (_: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  const handleNavigate = (e: MouseEvent<HTMLElement>) => {
    const movieId = e.currentTarget.dataset.movieId;
    if (!movieId) return;
    navigate(`/movie/${movieId}`);
  };

  const handleSetSortOption = (e: SelectChangeEvent) => {
    setSortOption(e.target.value as SortOption);
  };

  return (
    <Accordion
      sx={{
        width: '100%',
        borderRadius: '5px',
        fontSize: { xs: '1rem', sm: '1.2rem' },
        fontWeight: 'bold',
      }}
    >
      <AccordionSummary>내가 작성한 코멘트</AccordionSummary>
      <AccordionDetails
        sx={{
          paddingTop: '0',
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          height="40px"
        >
          <Select
            value={String(sortOption)}
            onChange={handleSetSortOption}
            sx={{
              width: { xs: '80px', sm: '100px' },
              fontSize: { xs: '0.8rem', sm: '1rem' },
              height: '40px',
              '& .MuiSelect-select': {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
            }}
          >
            <MenuItem value="가나다순">가나다순</MenuItem>
            <MenuItem value="최신순">최신순</MenuItem>
            <MenuItem value="등록순">등록순</MenuItem>
          </Select>
        </Box>
        <Divider
          sx={{
            margin: '5px 0',
          }}
        />
        <List>
          {sortedComments.slice((page - 1) * 5, page * 5).map((comment) => (
            <CommentListItem
              key={comment.movieId}
              comment={comment}
              handleListItemClick={handleNavigate}
            />
          ))}
          {sortedComments.length === 0 && (
            <Typography textAlign="center">
              작성한 코멘트가 없습니다.
            </Typography>
          )}
        </List>
        <Divider
          sx={{
            margin: '5px 0',
          }}
        />
        <Box display="flex" justifyContent="center">
          <Pagination
            onChange={handleSetPage}
            count={Math.ceil(sortedComments.length / 5)}
          />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default CommentAccordian;
