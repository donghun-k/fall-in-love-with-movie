import { Box, Paper, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';

import Movie from '../../models/Movie';
import { generatePosterImgSrc } from '../../utils/movieImgSrc';

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  const { title, release_date, poster_path } = movie;
  const imgSrc = poster_path
    ? generatePosterImgSrc({
        path: poster_path || '',
        size: 'w185',
      })
    : null;
  const releaseYear = release_date?.split('-')[0] ?? null;
  return (
    <Paper
      sx={{
        minWidth: '140px',
        overflow: 'hidden',
      }}
    >
      <Link
        style={{
          textDecoration: 'none',
        }}
        to={`/movie/${movie.id}`}
      >
        <Box
          sx={{
            width: '100%',
            aspectRatio: 2 / 3,
            '& img': {
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            },
            overflow: 'hidden',
          }}
        >
          {imgSrc ? (
            <img src={imgSrc} alt="title" />
          ) : (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'background.paper',
                color: 'text.secondary',
                transition: 'transform .3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
            >
              <ImageNotSupportedIcon
                sx={{
                  fontSize: { xs: '2rem', sm: '3rem' },
                }}
              />
              <Typography>No Image</Typography>
            </Box>
          )}
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
