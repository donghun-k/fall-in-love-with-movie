import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import useSearch from '../../hooks/search/useSearch';
import {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useEffect,
} from 'react';
import useMediaQueries from '../../hooks/useMediaQueries';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { closeSearchDialog } from '../../features/searchDialog/searchDialogSlice';

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

  const props = {
    openDialog,
    handleCloseSearchDialog,
    searchInput,
    handleSearchBtnClick,
    handleInputChange,
  };
  return <SearchDialogView {...props} />;
};

interface ViewProps {
  openDialog: boolean;
  handleCloseSearchDialog: () => void;
  searchInput: string;
  handleSearchBtnClick: FormEventHandler<HTMLElement>;
  handleInputChange: ChangeEventHandler<HTMLInputElement>;
}

const SearchDialogView = ({
  openDialog,
  handleCloseSearchDialog,
  searchInput,
  handleSearchBtnClick,
  handleInputChange,
}: ViewProps) => {
  return (
    <Dialog
      component="form"
      onSubmit={handleSearchBtnClick}
      open={openDialog}
      fullWidth={true}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
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
      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
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
