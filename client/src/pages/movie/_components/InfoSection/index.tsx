import { Box, Divider, Typography } from '@mui/material';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';

import MovieDetail from '../../../../models/MovieDetail';
import { generatePosterImgSrc } from '../../../../utils/movieImgSrc';
import RatingBox from './RatingBox';
import RatingInfoBox from './RatingInfoBox';

interface Props {
  movieDetail: MovieDetail;
}

const InfoSection = ({ movieDetail }: Props) => {
  const { poster_path } = movieDetail;

  const posterSrc = poster_path
    ? generatePosterImgSrc({
        path: poster_path,
        size: 'w342',
      })
    : null;

  const { title, overview, id: movieId } = movieDetail;
  return (
    <Box
      component="section"
      display="flex"
      flexDirection={{ xs: 'column-reverse', sm: 'row' }}
      justifyContent="space-between"
      alignItems="center"
      gap={{ xs: '10px', md: '50px' }}
      width="100%"
      height={{ xs: 'content-fit', sm: '375px', lg: '450px' }}
      padding={{ xs: '0 10px', md: '0' }}
    >
      {/* LEFT */}
      <Box
        width={{ xs: '250px', lg: '300px' }}
        height={{ xs: '375px', lg: '450px' }}
        margin={{ xs: '20px 0', sm: '0' }}
        boxShadow={(theme) => `0 0 5px 1px ${theme.palette.text.primary}`}
        sx={{
          '& img': {
            width: '100%',
            height: '100%',
          },
        }}
      >
        {posterSrc ? (
          <img src={posterSrc} alt={title} />
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100%"
            bgcolor="background.paper"
            color="text.secondary"
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
      {/* RIGHT */}
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="flex-start"
        width={{ sm: 'calc(100% - 270px)', lg: 'calc(100% - 350px)' }}
        height={{ xs: '500px', sm: '100%' }}
        padding={{ xs: '0 10px', sm: '0' }}
      >
        <Divider
          sx={{
            width: '100%',
          }}
        />
        <RatingBox movieDetail={movieDetail} />
        <Divider
          sx={{
            width: '100%',
          }}
        />
        <RatingInfoBox movieId={movieId} />
        <Divider
          sx={{
            width: '100%',
          }}
        />
        <Typography
          width="100%"
          height={{ xs: '30%', md: '40%' }}
          fontSize={{ xs: '0.8rem', md: '1rem' }}
          color="text.secondary"
          overflow="auto"
          padding="10px"
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
