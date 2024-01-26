import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';

import { openSearchDialog } from '../../store/searchDialogSlice';

const SearchButton = () => {
  const dispatch = useDispatch();

  const handleBtnClick = () => {
    dispatch(openSearchDialog());
  };

  return (
    <Button
      onClick={handleBtnClick}
      sx={{
        height: '50px',
      }}
      variant="text"
    >
      <SearchIcon fontSize="large" />
    </Button>
  );
};

export default SearchButton;
