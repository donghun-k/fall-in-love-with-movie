import { Box, Typography } from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const NoResultMessage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        padding: '50px',
      }}
    >
      <SentimentVeryDissatisfiedIcon sx={{ fontSize: '100px' }} />
      <Typography variant="h5">검색 결과가 없어요</Typography>
    </Box>
  );
};

export default NoResultMessage;
