import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { FormEventHandler, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useSearch from '../../hooks/search/useSearch';
import useMediaQueries from '../../hooks/useMediaQueries';
import { RootState } from '../../store';
import { closeSearchDialog } from '../../store/searchDialogSlice';

const SearchDialog = () => {
  const dispatch = useDispatch();
  const { searchInput, handleInputChange, handleSearch } = useSearch();
  const { isMdUp } = useMediaQueries();
  const { openDialog } = useSelector((state: RootState) => state.searchDialog);

  const handleCloseSearchDialog = useCallback(() => {
    dispatch(closeSearchDialog());
  }, [dispatch]);

  useEffect(() => {
    if (isMdUp) handleCloseSearchDialog();
  }, [isMdUp, handleCloseSearchDialog]);

  const handleSearchBtnClick: FormEventHandler<HTMLElement> = (e) => {
    e.preventDefault();
    handleCloseSearchDialog();
    handleSearch();
  };

  return (
    <Dialog
      component="form"
      onSubmit={handleSearchBtnClick}
      open={openDialog}
      fullWidth={true}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'center' }}>
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
        <Button variant="contained" onClick={handleCloseSearchDialog}>
          취소
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SearchDialog;
