import { Box, Typography, useTheme } from '@mui/material';
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

const RatingInfoBox = () => {
  const theme = useTheme();

  const chartData = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    datasets: [
      {
        label: '별점 분포',
        data: [10, 124, 323, 12, 346, 89, 99, 93, 1, 313],
        backgroundColor: theme.palette.primary.main,
      },
    ],
  };

  const props = {
    chartData,
  };
  return <RatingInfoBoxView {...props} />;
};

interface ViewProps {
  chartData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
    }[];
  };
}

const RatingInfoBoxView = ({ chartData }: ViewProps) => {
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
      <Bar options={chartOptions} data={chartData} />
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
          6.4
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '.8rem', sm: '.6rem', md: '.8rem' },
            color: 'text.secondary',
          }}
        >
          평균 별점
          <br />
          (1,024명)
        </Typography>
      </Box>
    </Box>
  );
};

export default RatingInfoBox;
