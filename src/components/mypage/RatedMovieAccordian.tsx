import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemButton,
  Menu,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import StarIcon from '@mui/icons-material/Star';
import Rating from '../../types/Rating';
import { ChangeEvent, useEffect, useState } from 'react';
import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  ratings: Rating[];
}

type SortOption = '최신순' | '등록순' | '가나다순';

const RatedMovieAccordian = ({ ratings }: Props) => {
  const navigate = useNavigate();
  const [ratingValueToShow, setRatingValueToShow] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [sortOption, setSortOption] = useState<SortOption>('가나다순');
  const [sortedRatings, setSortedRatings] = useState<Rating[]>([]);
  const [page, setPage] = useState<number>(1);

  const openSortMenu = Boolean(anchorEl);

  useEffect(() => {
    let sortedRatings = [...ratings];
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
  }, [ratings, sortOption, ratingValueToShow]);

  const handleSortMenuButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleSortMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSetSortOption = (e: MouseEvent<HTMLLIElement>) => {
    setSortOption(e.currentTarget.textContent as SortOption);
    setAnchorEl(null);
  };

  const handleSetPage = (_: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  const handleToMovieDetailPage = (e: MouseEvent<HTMLElement>) => {
    const movieId = e.currentTarget.dataset.movieId;
    if (!movieId) return;
    navigate(`/movie/${movieId}`);
  };

  const handleSetRatingValueToShow = (e: SelectChangeEvent) => {
    setRatingValueToShow(Number(e.target.value));
  };

  const props = {
    sortOption,
    sortedRatings,
    openSortMenu,
    anchorEl,
    handleSortMenuButtonClick,
    handleSortMenuClose,
    handleSetSortOption,
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
  sortedRatings: Rating[];
  openSortMenu: boolean;
  anchorEl: HTMLElement | null;
  handleSortMenuButtonClick: (e: MouseEvent<HTMLButtonElement>) => void;
  handleSortMenuClose: () => void;
  handleSetSortOption: (e: MouseEvent<HTMLLIElement>) => void;
  page: number;
  handleSetPage: (e: ChangeEvent<unknown>, page: number) => void;
  handleToMovieDetailPage: (e: MouseEvent<HTMLElement>) => void;
  ratingValueToShow: number;
  handleSetRatingValueToShow: (e: SelectChangeEvent) => void;
}

const RatedMovieAccordianView = ({
  sortOption,
  sortedRatings,
  openSortMenu,
  anchorEl,
  handleSortMenuButtonClick,
  handleSortMenuClose,
  handleSetSortOption,
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
        fontSize: '1.2rem',
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
          <Button
            sx={{
              fontWeight: 'bold',
            }}
            startIcon={<SortIcon />}
            onClick={handleSortMenuButtonClick}
          >
            {sortOption}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={openSortMenu}
            onClose={handleSortMenuClose}
          >
            <MenuItem onClick={handleSetSortOption}>가나다순</MenuItem>
            <MenuItem onClick={handleSetSortOption}>최신순</MenuItem>
            <MenuItem onClick={handleSetSortOption}>등록순</MenuItem>
          </Menu>
          <Select
            value={String(ratingValueToShow)}
            onChange={handleSetRatingValueToShow}
            sx={{
              width: '100px',
              height: '40px',
              '& .MuiSelect-select': {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
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
