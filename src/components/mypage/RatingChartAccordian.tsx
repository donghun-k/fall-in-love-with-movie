import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from '@mui/material';

interface Props {}

const RatingChartAccordian = ({}: Props) => {
  const props = {};
  return <RatingChartAccordianView {...props} />;
};

interface ViewProps {}

const RatingChartAccordianView = ({}: ViewProps) => {
  return (
    <Accordion
      sx={{
        width: '100%',
        borderRadius: '5px',
      }}
    >
      <AccordionSummary>내 별점 분포</AccordionSummary>
      <AccordionDetails>
        <Box>차트</Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default RatingChartAccordian;
