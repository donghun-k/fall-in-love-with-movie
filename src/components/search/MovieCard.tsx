import { Box, Paper, Tooltip, Typography } from '@mui/material';
import Movie from '../../types/Movie';
import { Link } from 'react-router-dom';
import { generatePosterImgSrc } from '../../utils/movieImgSrc';

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  const { title, release_date, poster_path } = movie;
  const imgSrc = generatePosterImgSrc({
    path: poster_path || '',
    size: 'w185',
  });
  const releaseYear = release_date.split('-')[0];
  return (
    <Paper
      sx={{
        width: {
          xs: 'calc(50% - 10px)',
          sm: 'calc(33.3333% - 13.5px)',
          md: 'calc(25% - 15px)',
          lg: 'calc(20% - 16px)',
        },
        minWidth: '140px',
        overflow: 'hidden',
      }}
    >
      <Link to={`/movie/${movie.id}`}>
        <Box
          sx={{
            width: '100%',
            aspectRatio: 2 / 3,
            transition: 'all .3s ease-in-out',
            filter: 'brightness(70%)',
            '&:hover': {
              filter: 'brightness(100%)',
            },
          }}
        >
          <img
            src={imgSrc}
            alt="title"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'grayscale(100%)',
            }}
          />
        </Box>
      </Link>
      <Box
        sx={{
          width: '100%',
          padding: '5px',
          paddingBottom: '10px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <Tooltip title={title} placement="top">
          <Typography
            sx={{
              fontSize: { xs: '.8rem', sm: '.9rem', lg: '1rem' },
              width: '90%',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              '& a': {
                color: 'text.primary',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              },
            }}
          >
            <Link to={`/movie/${movie.id}`}>{title}</Link>
          </Typography>
        </Tooltip>
        <Typography
          sx={{
            fontSize: { xs: '.7rem', sm: '.8rem', lg: '.9rem' },
            color: 'text.secondary',
          }}
        >
          {releaseYear}
        </Typography>
      </Box>
    </Paper>
  );
};

export default MovieCard;
