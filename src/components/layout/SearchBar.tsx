import { IconButton, InputBase, Paper } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import useSearch from '../../hooks/search/useSearch';
import { ChangeEventHandler, FormEventHandler } from 'react';

const SearchBar = () => {
  const { searchInput, handleInputChange, handleSearch } = useSearch();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    handleSearch();
  };
  const props = {
    searchInput,
    handleSubmit,
    handleInputChange,
  };
  return <SearchBarView {...props} />;
};

interface ViewProps {
  searchInput: string;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  handleInputChange: ChangeEventHandler<HTMLInputElement>;
}

const SearchBarView = ({
  searchInput,
  handleSubmit,
  handleInputChange,
}: ViewProps) => {
  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        backgroundColor: 'background.paper',
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        height: '50px',
        width: '220px',
        transition: '0.3s',
        '&:hover, &:focus-within': {
          backgroundColor: 'background.paperFocus',
        },
        '&:focus-within': {
          width: '250px',
        },
      }}
    >
      <InputBase
        sx={{
          ml: 1,
          color: 'text.secondary',
        }}
        value={searchInput}
        onChange={handleInputChange}
        placeholder="영화 제목을 입력하세요."
      />
      <IconButton
        aria-label="search"
        type="submit"
        sx={{
          p: '10px',
          transition: '0.3s',
          '&:hover': {
            color: 'text.buttonHover',
          },
        }}
      >
        <SearchRoundedIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
