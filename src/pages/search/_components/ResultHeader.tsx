import { Box, Typography, Divider } from '@mui/material';

interface Props {
  query: string;
  totalResult: number;
}

const ResultHeader = ({ query, totalResult }: Props) => (
  <Box
    position="sticky"
    top="80px"
    paddingTop="5px"
    marginBottom={{ xs: '10px', sm: '15px' }}
    zIndex="1"
    bgcolor="background.default"
    sx={{
      opacity: 0.8,
    }}
  >
    <Typography
      fontSize={{ xs: '.9rem', sm: '1.5rem' }}
      color="text.secondary"
      padding={{ xs: '10px 20px', sm: '10px 10px' }}
    >
      <Typography
        variant="body2"
        fontSize={{ xs: '1.1rem', sm: '2rem' }}
        color="text.primary"
      >
        "{query.length > 8 ? [...query].splice(0, 8).join('') + '...' : query}"
      </Typography>
      의 검색 결과{' '}
      <Typography
        variant="body2"
        fontSize={{ xs: '1rem', sm: '1.5rem' }}
        color="text.primary"
      >
        {totalResult}
      </Typography>
      건
    </Typography>
    <Divider
      sx={{
        borderBottomWidth: '2px',
      }}
    />
  </Box>
);

export default ResultHeader;
