import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

interface Props {}

const DeleteAccountAccordian = ({}: Props) => {
  const props = {};
  return <DeleteAccountAccordianView {...props} />;
};

interface ViewProps {}

const DeleteAccountAccordianView = ({}: ViewProps) => {
  return (
    <Accordion
      sx={{
        width: '100%',
        borderRadius: '5px',
      }}
    >
      <AccordionSummary
        sx={{
          color: 'text.secondary',
          transition: 'color 0.3s ease-in-out',
          '&:hover': {
            color: 'red',
          },
        }}
      >
        회원 탈퇴
      </AccordionSummary>
      <AccordionDetails>회원 탈퇴</AccordionDetails>
    </Accordion>
  );
};

export default DeleteAccountAccordian;
