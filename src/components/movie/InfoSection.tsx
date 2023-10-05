import MovieDetail from '../../types/MovieDetail';
import { generatePosterImgSrc } from '../../utils/movieImgSrc';
import { Box, Divider, Typography } from '@mui/material';
import RatingBox from './RatingBox';
import RatingInfoBox from './RatingInfoBox';

interface Props {
  movieDetail: MovieDetail;
}

const InfoSection = ({ movieDetail }: Props) => {
  const { title, poster_path, overview } = movieDetail;

  const posterSrc = generatePosterImgSrc({
    path: poster_path,
    size: 'w342',
  });

  const props = {
    title,
    posterSrc,
    overview,
  };

  return <InfoSectionView {...props} />;
};

interface ViewProps {
  title: string;
  posterSrc: string;
  overview: string;
}

const InfoSectionView = ({ title, posterSrc, overview }: ViewProps) => {
  return (
    <Box
      component="section"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column-reverse', sm: 'row' },
        gap: { xs: '10px', md: '50px' },
        width: '100%',
        height: { xs: 'content-fit', sm: '375px', lg: '450px' },
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: { xs: '0', sm: '0 10px' },
      }}
    >
      {/* LEFT */}
      <Box
        sx={{
          width: { xs: '250px', sm: '250px', lg: '300px' },
          height: { xs: '375px', sm: '375px', lg: '450px' },
          boxShadow: (theme) => `0 0 5px 1px ${theme.palette.text.primary}`,
          '& img': {
            width: '100%',
            height: '100%',
            filter: 'grayscale(100%)',
            transition: 'filter .5s ease-in-out',
            '&:hover': {
              filter: 'grayscale(0%)',
            },
          },
        }}
      >
        <img src={posterSrc} alt={title} />
      </Box>
      {/* RIGHT */}
      <Box
        sx={{
          display: 'flex',
          width: { sm: 'calc(100% - 270px)', lg: 'calc(100% - 350px)' },
          height: { xs: '500px', sm: '100%' },
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          padding: { xs: '0 10px', sm: '0' },
        }}
      >
        <Divider
          sx={{
            width: '100%',
          }}
        />
        <RatingBox />
        <Divider
          sx={{
            width: '100%',
          }}
        />
        <RatingInfoBox />
        <Divider
          sx={{
            width: '100%',
          }}
        />
        <Typography
          sx={{
            width: '100%',
            height: { xs: '30%', sm: '40%' },
            fontSize: { xs: '.9rem', sm: '.8rem', md: '1rem' },
            color: 'text.secondary',
            overflow: 'auto',
            padding: '10px',
          }}
        >
          {overview}
        </Typography>
        <Divider
          sx={{
            width: '100%',
          }}
        />
      </Box>
    </Box>
  );
};

export default InfoSection;
