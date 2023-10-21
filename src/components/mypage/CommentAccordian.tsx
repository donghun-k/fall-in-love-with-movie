import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

interface Props {}

const CommentAccordian = ({}: Props) => {
  const props = {};
  return <CommentAccordianView {...props} />;
};

interface ViewProps {}

const CommentAccordianView = ({}: ViewProps) => {
  return (
    <Accordion
      sx={{
        width: '100%',
        borderRadius: '5px',
      }}
    >
      <AccordionSummary>내가 작성한 코멘트</AccordionSummary>
      <AccordionDetails>코멘트</AccordionDetails>
    </Accordion>
  );
};

export default CommentAccordian;
