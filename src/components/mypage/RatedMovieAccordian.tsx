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

type SortOption = '별점 높은순' | '별점 낮은순' | '가나다순';

const RatedMovieAccordian = ({ ratings }: Props) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [sortOption, setSortOption] = useState<SortOption>('가나다순');
  const [sortedRatings, setSortedRatings] = useState<Rating[]>([]);
  const [page, setPage] = useState<number>(1);

  const openSortMenu = Boolean(anchorEl);

  useEffect(() => {
    const sortedRatings = [...ratings];
    if (sortOption === '가나다순') {
      sortedRatings.sort((a, b) => {
        return a.movieTitle.localeCompare(b.movieTitle);
      });
    } else if (sortOption === '별점 높은순') {
      sortedRatings.sort((a, b) => {
        return b.rating - a.rating;
      });
    } else if (sortOption === '별점 낮은순') {
      sortedRatings.sort((a, b) => {
        return a.rating - b.rating;
      });
    }
    setSortedRatings(sortedRatings);
  }, [ratings, sortOption]);

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

  const handleSetPage = (e: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  const handleToMovieDetailPage = (e: MouseEvent<HTMLElement>) => {
    const movieId = e.currentTarget.dataset.movieId;
    if (!movieId) return;
    navigate(`/movie/${movieId}`);
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
            height: 'fit-content',
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
            <MenuItem onClick={handleSetSortOption}>별점 높은순</MenuItem>
            <MenuItem onClick={handleSetSortOption}>별점 낮은순</MenuItem>
          </Menu>
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
