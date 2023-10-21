import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

interface Props {}

const PreferredGenreAccordian = ({}: Props) => {
  const props = {};
  return <PreferredGenreAccordianView {...props} />;
};

interface ViewProps {}

const PreferredGenreAccordianView = ({}: ViewProps) => {
  return (
    <Accordion
      sx={{
        width: '100%',
        borderRadius: '5px',
      }}
    >
      <AccordionSummary>선호하는 장르</AccordionSummary>
      <AccordionDetails>장르</AccordionDetails>
    </Accordion>
  );
};

export default PreferredGenreAccordian;
