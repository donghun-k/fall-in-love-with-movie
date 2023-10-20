import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface Props {
  handleSearchDialogOpen: () => void;
}

const SearchButton = ({ handleSearchDialogOpen }: Props) => {
  const props = {
    handleBtnClick: handleSearchDialogOpen,
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
