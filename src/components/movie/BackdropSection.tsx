import { Box, Grid, Typography } from '@mui/material';
import MovieDetail from '../../types/MovieDetail';
import { generateBackdropImgSrc } from '../../utils/movieImgSrc';

interface Props {
  movieDetail: MovieDetail;
}

const BackdropSection = ({ movieDetail }: Props) => {
  const {
    backdrop_path,
    title,
    original_title,
    release_date,
    runtime,
    genres,
    production_countries,
  } = movieDetail;

  const backdropSrc = generateBackdropImgSrc({
    path: backdrop_path,
    size: 'w1280',
  });
  const releaseYear = release_date.split('-')[0];
  const country = production_countries
    .map((country) => country.name)
    .join(', ');
  const genresString = genres.map((genre) => genre.name).join(', ');

  const props = {
    title,
    original_title,
    releaseYear,
    runtime,
    genresString,
    country,
    backdropSrc,
  };

  return <BackdropSectionView {...props} />;
};

interface ViewProps {
  backdropSrc: string;
  title: string;
  original_title: string;
  releaseYear: string;
  runtime: number;
  genresString: string;
  country: string;
}

const BackdropSectionView = ({
  backdropSrc,
  title,
  original_title,
  releaseYear,
  runtime,
  genresString,
  country,
}: ViewProps) => {
  return (
    <Box
      component="section"
      sx={{
        width: '100vw',
        height: { xs: '280px', sm: '350px' },
        position: 'relative',
        '& img': {
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'grayscale(100%)',
          transition: 'filter .5s ease-in-out',
        },
        '&:hover img': {
          filter: 'grayscale(0%)',
        },
      }}
    >
      <img src={backdropSrc} alt={title} />
      <Box
        sx={{
          position: 'absolute',
          top: '0',
          width: '100%',
          height: '50px',
          background:
            'linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.3) 100%)',
        }}
      ></Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: '0',
          width: '100%',
          height: '250px',
          background:
            'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.9) 100%)',
        }}
      ></Box>
      <Grid container sx={{ position: 'absolute', bottom: 0 }}>
        <Grid item xs={0} md={1} lg={2} />
        <Grid
          item
          xs={12}
          md={10}
          lg={8}
          sx={{
            padding: { xs: '10px 10px', md: '10px 0' },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: '28px', sm: '36px' },
            }}
            color="white"
          >
            {title}
          </Typography>
          <Typography
            color="lightgray"
            sx={{
              fontSize: { xs: '16px', sm: '20px' },
              marginBottom: '5px',
            }}
          >
            {original_title}
          </Typography>
          <Typography
            color="lightgray"
            sx={{
              fontSize: { xs: '12px', sm: '14px' },
              marginBottom: '8px',
            }}
          >
            {releaseYear} · {runtime}분 · {country}
          </Typography>
          <Typography
            color="lightgray"
            sx={{
              fontSize: { xs: '12px', sm: '14px' },
            }}
          >
            {genresString}
          </Typography>
        </Grid>
        <Grid item xs={0} md={1} lg={2} />
      </Grid>
    </Box>
  );
};

export default BackdropSection;
