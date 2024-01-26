import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';

import { openSearchDialog } from '../../store/searchDialogSlice';

const SearchButton = () => {
  const dispatch = useDispatch();

  const handleBtnClick = () => {
    dispatch(openSearchDialog());
  };

  const props = {
    handleBtnClick,
  };

  return <SearchButtonView {...props} />;
};

interface ViewProps {
  handleBtnClick: () => void;
}

const SearchButtonView = ({ handleBtnClick }: ViewProps) => {
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
