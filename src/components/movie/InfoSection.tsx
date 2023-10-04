import MovieDetail from '../../types/MovieDetail';
import { generatePosterImgSrc } from '../../utils/movieImgSrc';
import { Box } from '@mui/material';

interface Props {
  movieDetail: MovieDetail;
}

const InfoSection = ({ movieDetail }: Props) => {
  const { title, poster_path } = movieDetail;

  const posterSrc = generatePosterImgSrc({
    path: poster_path,
    size: 'w342',
  });

  const props = {
    title,
    posterSrc,
  };

  return <InfoSectionView {...props} />;
};

interface ViewProps {
  title: string;
  posterSrc: string;
}

const InfoSectionView = ({ title, posterSrc }: ViewProps) => {
  return (
    <Box
      component="section"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: '50px',
        width: '100%',
        height: { xs: '300px', sm: '375px', lg: '450px' },
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          width: { xs: '200px', sm: '250px', lg: '300px' },
          height: { xs: '300px', sm: '375px', lg: '450px' },
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
      <Box
        sx={{
          display: 'flex',
          width: { sm: 'calc(100% - 250px)', lg: 'calc(100% - 350px)' },
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      ></Box>
    </Box>
  );
};

export default InfoSection;
