import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import useDialog from '../../hooks/useDialog';

const SearchButton = () => {
  const { openDialog } = useDialog();

  const handleOpenDialog = () => {
    openDialog({
      dialogInfo: { type: 'search', props: null },
    });
  };

  return (
    <Button
      onClick={handleOpenDialog}
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
