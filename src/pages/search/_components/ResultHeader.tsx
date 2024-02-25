import { Box, Typography, Divider } from '@mui/material';

interface Props {
  query: string;
  totalResult: number;
}

const ResultHeader = ({ query, totalResult }: Props) => (
  <Box
    position="sticky"
    sx={{
      paddingTop: '5px',
      top: '80px',
      zIndex: 1,
      backgroundColor: 'background.default',
      opacity: 0.8,
      marginBottom: { xs: '10px', sm: '15px' },
    }}
  >
    <Typography
      sx={{
        padding: { xs: '10px 20px', sm: '10px 10px' },
        color: 'text.secondary',
        fontSize: { xs: '.9rem', sm: '1.5rem' },
        '& .query': {
          color: 'text.primary',
          fontSize: { xs: '1.1rem', sm: '2rem' },
        },
        '& .total': {
          color: 'text.primary',
          fontSize: { xs: '1rem', sm: '1.5rem' },
        },
      }}
    >
      <span className="query">
        "{query.length > 8 ? [...query].splice(0, 8).join('') + '...' : query}"
      </span>
      의 검색 결과 <span className="total">{totalResult}</span>건
    </Typography>
    <Divider
      sx={{
        borderBottomWidth: '2px',
      }}
    />
  </Box>
);

export default ResultHeader;
