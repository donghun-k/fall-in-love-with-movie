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
import Rating from '../../models/Rating';
import { ChangeEvent, useEffect, useState } from 'react';
import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  myRatings: Rating[];
}

type SortOption = '최신순' | '등록순' | '가나다순';

const RatedMovieAccordian = ({ myRatings }: Props) => {
  const navigate = useNavigate();
  const [ratingValueToShow, setRatingValueToShow] = useState(0);
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

    if (ratingValueToShow !== 0) {
      sortedRatings = sortedRatings.filter((rating) => {
        return rating.rating === ratingValueToShow;
      });
    }

    setSortedRatings(sortedRatings);
  }, [myRatings, sortOption, ratingValueToShow]);

  const handleSetPage = (_: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  const handleToMovieDetailPage = (e: MouseEvent<HTMLElement>) => {
    const movieId = e.currentTarget.dataset.movieId;
    if (!movieId) return;
    navigate(`/movie/${movieId}`);
  };

  const handleSetSortOption = (e: SelectChangeEvent) => {
    setSortOption(e.target.value as SortOption);
  };

  const handleSetRatingValueToShow = (e: SelectChangeEvent) => {
    setRatingValueToShow(Number(e.target.value));
  };

  const props = {
    sortOption,
    handleSetSortOption,
    sortedRatings,
    page,
    handleSetPage,
    handleToMovieDetailPage,
    ratingValueToShow,
    handleSetRatingValueToShow,
  };
  return <RatedMovieAccordianView {...props} />;
};

interface ViewProps {
  sortOption: SortOption;
  handleSetSortOption: (e: SelectChangeEvent) => void;
  sortedRatings: Rating[];
  page: number;
  handleSetPage: (e: ChangeEvent<unknown>, page: number) => void;
  handleToMovieDetailPage: (e: MouseEvent<HTMLElement>) => void;
  ratingValueToShow: number;
  handleSetRatingValueToShow: (e: SelectChangeEvent) => void;
}

const RatedMovieAccordianView = ({
  sortOption,
  handleSetSortOption,
  sortedRatings,
  page,
  handleSetPage,
  handleToMovieDetailPage,
  ratingValueToShow,
  handleSetRatingValueToShow,
}: ViewProps) => {
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
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '40px',
          }}
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
            value={String(ratingValueToShow)}
            onChange={handleSetRatingValueToShow}
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
            <MenuItem value={0}>
              <StarIcon /> All
            </MenuItem>
            <MenuItem value={1}>
              <StarIcon /> 1
            </MenuItem>
            <MenuItem value={2}>
              <StarIcon /> 2
            </MenuItem>
            <MenuItem value={3}>
              <StarIcon /> 3
            </MenuItem>
            <MenuItem value={4}>
              <StarIcon /> 4
            </MenuItem>
            <MenuItem value={5}>
              <StarIcon /> 5
            </MenuItem>
            <MenuItem value={6}>
              <StarIcon /> 6
            </MenuItem>
            <MenuItem value={7}>
              <StarIcon /> 7
            </MenuItem>
            <MenuItem value={8}>
              <StarIcon /> 8
            </MenuItem>
            <MenuItem value={9}>
              <StarIcon /> 9
            </MenuItem>
            <MenuItem value={10}>
              <StarIcon /> 10
            </MenuItem>
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
                onClick={handleToMovieDetailPage}
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
            <Typography
              sx={{
                textAlign: 'center',
              }}
            >
              평가한 영화가 없습니다.
            </Typography>
          )}
        </List>
        <Divider
          sx={{
            margin: '5px 0',
          }}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
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
