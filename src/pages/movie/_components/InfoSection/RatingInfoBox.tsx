import { Box, CircularProgress, Typography, useTheme } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import useRatingStatisticsQuery from '../../../../hooks/queries/useRatingStatisticsQuery';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      display: false,
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
};

interface Props {
  movieId: number;
}

const RatingInfoBox = ({ movieId }: Props) => {
  const theme = useTheme();
  const { data, isLoading } = useRatingStatisticsQuery({
    movieId,
  });
  const { ratingData, totalRatingCount, averageRating } = data ?? {
    ratingData: [],
    totalRatingCount: 0,
    averageRating: 0,
  };

  return (
    <Box
      display="flex"
      flexDirection={{ xs: 'column-reverse', md: 'row' }}
      justifyContent={
        isLoading ? 'center' : { xs: 'space-evenly', sm: 'space-between' }
      }
      alignItems="center"
      gap={{ xs: '30px', sm: '10px' }}
      width="100%"
      height={{ xs: '50%', md: '40%' }}
      padding={{ xs: '20px 0', sm: '10px' }}
    >
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Box
            width={{ xs: '80%', sm: '260px', md: '360px' }}
            height={{ xs: '100%', sm: '70%', md: '100%' }}
            paddingTop={{ xs: '0', sm: '10px' }}
          >
            <Bar
              options={chartOptions}
              data={{
                labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                datasets: [
                  {
                    label: '별점 분포',
                    data: ratingData,
                    backgroundColor: theme.palette.primary.main,
                  },
                ],
              }}
            />
          </Box>
          <Box
            display="flex"
            flexDirection={{ xs: 'row-reverse', md: 'column' }}
            alignItems={{ xs: 'center', md: 'flex-end' }}
            gap={{ xs: '10px', md: '0px' }}
            textAlign={{ xs: 'center', md: 'right' }}
          >
            <Typography fontSize={{ xs: '1.5rem', sm: '1rem', md: '1.5rem' }}>
              {averageRating}
            </Typography>
            <Typography fontSize=".8rem" color="text.secondary">
              <span>평균 별점</span>
              <span>({totalRatingCount}명)</span>
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
};

export default RatingInfoBox;
