import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
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
import { useEffect, useState } from 'react';

import Rating from '../../../models/Rating';

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
  myRatings: Rating[];
}

const RatingChartAccordian = ({ myRatings }: Props) => {
  const theme = useTheme();

  const [ratingData, setRatingData] = useState(Array(10).fill(0));
  const [averageRating, setAverageRating] = useState(0);
  const totalRatingCount = myRatings.length;

  useEffect(() => {
    if (myRatings.length === 0) return;
    const ratingData = Array(10).fill(0);
    let sumRating = 0;
    let count = 0;
    myRatings.forEach((rating) => {
      ratingData[rating.rating - 1]++;
      sumRating += rating.rating;
      count++;
    });
    const averageRating = Number((sumRating / count).toFixed(1));
    setRatingData(ratingData);
    setAverageRating(averageRating);
  }, [myRatings]);

  return (
    <Accordion
      sx={{
        width: '100%',
        borderRadius: '5px',
        fontSize: { xs: '1rem', sm: '1.2rem' },
        fontWeight: 'bold',
      }}
    >
      <AccordionSummary>내 별점 분포</AccordionSummary>
      <AccordionDetails>
        <Box
          padding="10px"
          paddingTop="20px"
          bgcolor="background.paper"
          borderRadius="10px"
          overflow="hidden"
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
          display="flex"
          justifyContent="space-evenly"
          width="100%"
          height="80px"
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography
              fontSize=".8rem"
              fontWeight="bold"
              color="text.secondary"
            >
              평가한 작품 수
            </Typography>
            <Typography fontSize="1.4rem" fontWeight="bold">
              {totalRatingCount}
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography
              fontSize=".8rem"
              fontWeight="bold"
              color="text.secondary"
            >
              평균 별점
            </Typography>
            <Typography fontSize="1.4rem" fontWeight="bold">
              {averageRating}
            </Typography>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default RatingChartAccordian;
