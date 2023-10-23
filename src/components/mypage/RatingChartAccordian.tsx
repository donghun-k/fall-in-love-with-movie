import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
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
import useMyRatingStatisticsQuery from '../../hooks/rating/useMyRatingStatisticsQuery';
import { RatingsStatisticsResponse } from '../../api/rating';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const chartOptions = {
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
  userId: string;
}

const RatingChartAccordian = ({ userId }: Props) => {
  const theme = useTheme();
  const { data } = useMyRatingStatisticsQuery({
    userId,
  });
  const props = {
    theme,
    data,
  };
  return <RatingChartAccordianView {...props} />;
};

interface ViewProps {
  theme: Theme;
  data: RatingsStatisticsResponse | undefined;
}

const RatingChartAccordianView = ({ theme, data }: ViewProps) => {
  if (!data) return null;
  const { ratingData, totalRatingCount, averageRating } = data;
  return (
    <Accordion
      sx={{
        width: '100%',
        borderRadius: '5px',
      }}
    >
      <AccordionSummary>내 별점 분포</AccordionSummary>
      <AccordionDetails>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            height: '80px',
            justifyContent: 'space-evenly',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: '.8rem',
                color: 'text.secondary',
              }}
            >
              평가한 작품 수
            </Typography>
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: '1.4rem',
              }}
            >
              {totalRatingCount}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: '.8rem',
                color: 'text.secondary',
              }}
            >
              평균 별점
            </Typography>
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: '1.4rem',
              }}
            >
              {averageRating}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            padding: '0 10px',
          }}
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
      </AccordionDetails>
    </Accordion>
  );
};

export default RatingChartAccordian;
