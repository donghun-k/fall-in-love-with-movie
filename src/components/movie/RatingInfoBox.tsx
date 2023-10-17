import {
  Box,
  CircularProgress,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
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
import useRatingStatisticsQuery from '../../hooks/rating/useRatingStatisticsQuery';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const chartOptions = {
  responsive: false,
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

interface RatingInfoBoxProps {
  movieId: number;
}

const RatingInfoBox = ({ movieId }: RatingInfoBoxProps) => {
  const theme = useTheme();
  const { data, isLoading } = useRatingStatisticsQuery({
    movieId,
  });
  const { ratingData, totalRatingCount, averageRating } = data ?? {
    ratingData: [],
    totalRatingCount: 0,
    averageRating: 0,
  };

  const props = {
    theme,
    ratingData,
    totalRatingCount,
    averageRating,
    isLoading,
  };
  return <RatingInfoBoxView {...props} />;
};

interface ViewProps {
  theme: Theme;
  ratingData: number[];
  totalRatingCount: number;
  averageRating: number;
  isLoading: boolean;
}

const RatingInfoBoxView = ({
  theme,
  ratingData,
  totalRatingCount,
  averageRating,
  isLoading,
}: ViewProps) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: { xs: '50%', sm: '40%' },
        display: 'flex',
        flexDirection: { xs: 'column-reverse', sm: 'row' },
        justifyContent: { xs: 'space-evenly', sm: 'space-between' },
        alignItems: 'center',
        padding: '10px',
      }}
    >
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
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
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'row-reverse', sm: 'column' },
              alignItems: { xs: 'center', sm: 'flex-end' },
              textAlign: { xs: 'center', sm: 'right' },
              gap: { xs: '10px', sm: '0px' },
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: '1.5rem', sm: '1rem', md: '1.5rem' },
              }}
            >
              {averageRating}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '.8rem', sm: '.6rem', md: '.8rem' },
                color: 'text.secondary',
              }}
            >
              평균 별점
              <br />({totalRatingCount}명)
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
};

export default RatingInfoBox;
