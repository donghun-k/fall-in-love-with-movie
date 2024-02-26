import { Box, Grid, Typography } from '@mui/material';

import MovieDetail from '../../../models/MovieDetail';
import { generateBackdropImgSrc } from '../../../utils/movieImgSrc';
interface BackdropSectionProps {
  movieDetail: MovieDetail;
}

const BackdropSection = ({ movieDetail }: BackdropSectionProps) => {
  const {
    backdrop_path,
    title,
    original_title,
    release_date,
    runtime,
    genres,
    production_countries,
  } = movieDetail;

  const backdropSrc = backdrop_path
    ? generateBackdropImgSrc({ path: backdrop_path, size: 'w1280' })
    : null;
  const releaseYear = release_date.split('-')[0];
  const country = production_countries
    .map((country) => country.name)
    .join(', ');
  const genresString = genres.map((genre) => genre.name).join(', ');

  return (
    <Box
      component="section"
      position="relative"
      width="100vw"
      height={{ xs: '280px', sm: '350px' }}
      sx={{
        '& img': {
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        },
        '&:hover img': {
          filter: 'grayscale(0%)',
        },
      }}
    >
      {backdropSrc && <img src={backdropSrc} alt={title} />}
      <Box
        position="absolute"
        top="0"
        width="100%"
        height="50px"
        sx={{
          background:
            'linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.3) 100%)',
        }}
      ></Box>
      <Box
        position="absolute"
        bottom="0"
        width="100%"
        height="250px"
        sx={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.9) 100%)',
        }}
      ></Box>
      <Grid container position="absolute" bottom="0">
        <Grid item xs={0} md={1} lg={2} />
        <Grid
          item
          xs={12}
          md={10}
          lg={8}
          padding={{ xs: '10px 10px', md: '10px 0' }}
        >
          <Typography
            fontSize={{
              xs: '28px',
              sm: '36px',
            }}
            color="white"
          >
            {title}
          </Typography>
          <Typography
            color="lightgray"
            fontSize={{ xs: '16px', sm: '20px' }}
            marginBottom="5px"
          >
            {original_title}
          </Typography>
          <Typography
            color="lightgray"
            fontSize={{ xs: '12px', sm: '14px' }}
            marginBottom="8px"
          >
            {releaseYear} · {runtime}분 · {country}
          </Typography>
          <Typography color="lightgray" fontSize={{ xs: '12px', sm: '14px' }}>
            {genresString}
          </Typography>
        </Grid>
        <Grid item xs={0} md={1} lg={2} />
      </Grid>
    </Box>
  );
};

export default BackdropSection;
