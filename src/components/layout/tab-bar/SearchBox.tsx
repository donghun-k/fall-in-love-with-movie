import { Box, IconButton } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import SearchBar from '../SearchBar';

interface Props {
  isSearchBoxOpened: boolean;
  closeSearchBox: () => void;
}

const SearchBox = ({ isSearchBoxOpened, closeSearchBox }: Props) => {
  const props = {
    isSearchBoxOpened,
    handleCloseBtnClick: closeSearchBox,
  };
  return <SearchBoxView {...props} />;
};

interface ViewProps {
  isSearchBoxOpened: boolean;
  handleCloseBtnClick: () => void;
}

const SearchBoxView = ({
  isSearchBoxOpened,
  handleCloseBtnClick,
}: ViewProps) => {
  return (
    <Box
      sx={{
        backgroundColor: 'background.nav',
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        transition: '.5s',
        transform: isSearchBoxOpened ? 'translateY(0)' : 'translateY(100%)',
      }}
    >
      <SearchBar />
      <IconButton
        size="large"
        onClick={handleCloseBtnClick}
        sx={{
          top: '0',
          opacity: isSearchBoxOpened ? 1 : 0,
          transition: '.5s',
          transform: isSearchBoxOpened ? 'translateY(-130%)' : 'translateY(0)',
          padding: 0,
          position: 'absolute',
        }}
      >
        <HighlightOffOutlinedIcon fontSize="large" />
      </IconButton>
    </Box>
  );
};

export default SearchBox;
