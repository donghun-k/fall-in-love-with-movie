import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import useSearch from '../../hooks/search/useSearch';
import { ChangeEventHandler, FormEventHandler, useEffect } from 'react';
import useMediaQueries from '../../hooks/useMediaQueries';

interface Props {
  open: boolean;
  handleSearchDialogClose: () => void;
}

const SearchDialog = ({ open, handleSearchDialogClose }: Props) => {
  const { searchInput, handleInputChange, handleSearch } = useSearch();
  const { isMdUp } = useMediaQueries();

  useEffect(() => {
    if (isMdUp) handleSearchDialogClose();
  }, [isMdUp, handleSearchDialogClose]);

  const handleSearchBtnClick: FormEventHandler<HTMLElement> = (e) => {
    e.preventDefault();
    handleSearchDialogClose();
    handleSearch();
  };

  const props = {
    open,
    handleSearchDialogClose,
    searchInput,
    handleSearchBtnClick,
    handleInputChange,
  };
  return <SearchDialogView {...props} />;
};

interface ViewProps {
  open: boolean;
  handleSearchDialogClose: () => void;
  searchInput: string;
  handleSearchBtnClick: FormEventHandler<HTMLElement>;
  handleInputChange: ChangeEventHandler<HTMLInputElement>;
}

const SearchDialogView = ({
  open,
  handleSearchDialogClose,
  searchInput,
  handleSearchBtnClick,
  handleInputChange,
}: ViewProps) => {
  return (
    <Dialog
      component="form"
      onSubmit={handleSearchBtnClick}
      open={open}
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
        <Button variant="contained" onClick={handleSearchDialogClose}>
          취소
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SearchDialog;
