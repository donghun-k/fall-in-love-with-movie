import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemButton,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { ChangeEvent, useEffect, useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import Rating from '../../../models/Rating';

interface Props {
  myRatings: Rating[];
}

type SortOption = '최신순' | '등록순' | '가나다순';

const RatedMovieAccordian = ({ myRatings }: Props) => {
  const navigate = useNavigate();
  const [ratingValue, setRatingValue] = useState(0);
  const [sortOption, setSortOption] = useState<SortOption>('가나다순');
  const [sortedRatings, setSortedRatings] = useState<Rating[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let sortedRatings = [...myRatings];
    if (sortOption === '가나다순') {
      sortedRatings.sort((a, b) => {
        return a.movieTitle.localeCompare(b.movieTitle);
      });
    } else if (sortOption === '최신순') {
      sortedRatings.sort((a, b) => {
        return b.ratedAt - a.ratedAt;
      });
    } else if (sortOption === '등록순') {
      sortedRatings.sort((a, b) => {
        return a.ratedAt - b.ratedAt;
      });
    }

    if (ratingValue !== 0) {
      sortedRatings = sortedRatings.filter((rating) => {
        return rating.rating === ratingValue;
      });
    }

    setSortedRatings(sortedRatings);
  }, [myRatings, sortOption, ratingValue]);

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

  const handleSetRatingValue = (e: SelectChangeEvent) => {
    setRatingValue(Number(e.target.value));
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
      <AccordionSummary>평가한 영화</AccordionSummary>
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
          <Select
            value={String(ratingValue)}
            onChange={handleSetRatingValue}
            sx={{
              width: { xs: '80px', sm: '100px' },
              fontSize: { xs: '0.8rem', sm: '1rem' },
              height: '40px',
              '& .MuiSelect-select': {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: 'none',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '& .MuiSvgIcon-root': {
                fontSize: { xs: '1rem', sm: '1.2rem' },
              },
            }}
          >
            {Array.from({ length: 11 }, (_, index) => (
              <MenuItem value={index} key={index}>
                <StarIcon /> {index === 0 ? 'All' : index}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Divider
          sx={{
            margin: '5px 0',
          }}
        />
        <List>
          {sortedRatings.slice((page - 1) * 5, page * 5).map((rating) => (
            <ListItem disablePadding key={rating.movieId}>
              <ListItemButton
                onClick={handleNavigate}
                data-movie-id={rating.movieId}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Typography>{rating.movieTitle}</Typography>
                <Chip icon={<StarIcon />} label={rating.rating} size="small" />
              </ListItemButton>
            </ListItem>
          ))}
          {sortedRatings.length === 0 && (
            <Typography textAlign="center">평가한 영화가 없습니다.</Typography>
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
            count={Math.ceil(sortedRatings.length / 5)}
          />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default RatedMovieAccordian;
