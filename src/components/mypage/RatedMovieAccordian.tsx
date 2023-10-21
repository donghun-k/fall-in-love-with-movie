import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

interface Props {}

const RatedMovieAccordian = ({}: Props) => {
  const props = {};
  return <RatedMovieAccordianView {...props} />;
};

interface ViewProps {}

const RatedMovieAccordianView = ({}: ViewProps) => {
  return (
    <Accordion
      sx={{
        width: '100%',
        borderRadius: '5px',
      }}
    >
      <AccordionSummary>평가한 작품</AccordionSummary>
      <AccordionDetails>영화 카드 리스트</AccordionDetails>
    </Accordion>
  );
};

export default RatedMovieAccordian;
