import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
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
import useMyRatings from '../../hooks/rating/useMyRatings';
import { useEffect, useState } from 'react';

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
  const { data } = useMyRatings({
    userId,
  });
  const [ratingData, setRatingData] = useState(Array(10).fill(0));
  const [averageRating, setAverageRating] = useState(0);
  const totalRatingCount = data?.length || 0;

  useEffect(() => {
    if (!data || data.length === 0) return;
    const ratingData = Array(10).fill(0);
    let sumRating = 0;
    let count = 0;
    data.forEach((rating) => {
      ratingData[rating.rating - 1]++;
      sumRating += rating.rating;
      count++;
    });
    const averageRating = Number((sumRating / count).toFixed(1));
    setRatingData(ratingData);
    setAverageRating(averageRating);
  }, [data]);
  const props = {
    theme,
    ratingData,
    averageRating,
    totalRatingCount,
  };
  return <RatingChartAccordianView {...props} />;
};

interface ViewProps {
  ratingData: number[];
  averageRating: number;
  totalRatingCount: number;
  theme: Theme;
}

const RatingChartAccordianView = ({
  ratingData,
  averageRating,
  totalRatingCount,
  theme,
}: ViewProps) => {
  return (
    <Accordion
      sx={{
        width: '100%',
        borderRadius: '5px',
        fontSize: '1.2rem',
        fontWeight: 'bold',
      }}
    >
      <AccordionSummary>내 별점 분포</AccordionSummary>
      <AccordionDetails>
        <Box
          sx={{
            padding: '10px',
            backgroundColor: 'background.paper',
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
        <Divider
          sx={{
            margin: '10px 0',
          }}
        />
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
              justifyContent: 'center',
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
              justifyContent: 'center',
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
      </AccordionDetails>
    </Accordion>
  );
};

export default RatingChartAccordian;
