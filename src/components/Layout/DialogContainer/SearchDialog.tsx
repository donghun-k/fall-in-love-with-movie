import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { FormEventHandler } from 'react';

import useSearch from '../../../hooks/useSearch';
import useMediaQueries from '../../../hooks/useMediaQueries';
import useDialog from '../../../hooks/useDialog';

const SearchDialog = () => {
  const { searchInput, handleInputChange, handleSearch } = useSearch();
  const { isMdUp } = useMediaQueries();

  const { closeDialog } = useDialog();

  const handleCloseDialog = () => {
    closeDialog();
  };

  if (isMdUp) handleCloseDialog();

  const handleSearchBtnClick: FormEventHandler<HTMLElement> = (e) => {
    e.preventDefault();
    handleCloseDialog();
    handleSearch();
  };

  return (
    <Dialog
      component="form"
      onSubmit={handleSearchBtnClick}
      open={true}
      fullWidth={true}
      maxWidth="xs"
    >
      <DialogTitle display="flex" justifyContent="center">
        검색
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          placeholder="영화 제목을 입력하세요."
          value={searchInput}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button type="submit" variant="contained">
          검색
        </Button>
        <Button variant="contained" onClick={handleCloseDialog}>
          취소
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SearchDialog;
