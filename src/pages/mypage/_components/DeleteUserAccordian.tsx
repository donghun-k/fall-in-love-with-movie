import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { deleteAccount, signOut } from '../../../services/auth';

const DeleteUserAccordian = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');

  const isButtonActive = inputText === '네, 확인했습니다.';
  const handleInputTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 10) return;
    setInputText(e.target.value);
  };
  const handleDeleteUser = async () => {
    if (!isButtonActive) return;
    try {
      await deleteAccount();
      enqueueSnackbar('계정이 삭제되었습니다.', {
        variant: 'success',
      });
    } catch (error) {
      enqueueSnackbar('계정 삭제에 실패하였습니다.', {
        variant: 'error',
      });
      await signOut();
    } finally {
      navigate('/signin');
    }
  };

  return (
    <Accordion
      sx={{
        width: '100%',
        borderRadius: '5px',
        fontSize: { xs: '1rem', sm: '1.2rem' },
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
        계정 삭제
      </AccordionSummary>
      <AccordionDetails>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="justify-evenly"
          alignItems="flex-start"
          gap="20px"
        >
          <Typography
            display="flex"
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="center"
            gap="10px"
            fontSize={{ xs: '1rem', sm: '1.2rem' }}
          >
            <WarningIcon />
            정말로 계정을 삭제하시겠습니까?
          </Typography>
          <Typography
            fontSize={{ xs: '.8rem', sm: '1rem' }}
            color="text.secondary"
          >
            계정을 삭제하면 복구할 수 없으며, 등록한 평가와 코멘트는 자동으로
            삭제되지 않습니다.
          </Typography>
          <Typography
            fontSize={{ xs: '.8rem', sm: '1rem' }}
            color="text.secondary"
          >
            정말로 삭제하시려면 아래에{' '}
            <Typography
              component="span"
              fontFamily="sans-serif"
              fontStyle="italic"
            >
              네, 확인했습니다.
            </Typography>{' '}
            를 입력하고 계정 삭제 버튼을 눌러주세요.
          </Typography>
          <TextField value={inputText} onChange={handleInputTextChange} />
          <Button
            onClick={handleDeleteUser}
            variant="contained"
            disabled={!isButtonActive}
          >
            계정 삭제
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default DeleteUserAccordian;
