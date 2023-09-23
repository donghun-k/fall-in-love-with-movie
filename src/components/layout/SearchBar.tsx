import { IconButton, InputBase, Paper } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useState } from 'react';

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    alert('Search!: ' + searchInput);
  };
  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchInput(e.target.value);
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
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  handleInputChange: React.ChangeEventHandler<HTMLInputElement>;
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
        backgroundColor: '#222',
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        height: 50,
        width: 200,
        mr: '20px',
        transition: '0.3s',
        '&:hover, &:focus-within': {
          backgroundColor: '#333',
        },
        '&:focus-within': {
          width: 250,
        },
      }}
    >
      <InputBase
        sx={{
          ml: 1,
          color: 'primary.light',
        }}
        value={searchInput}
        onChange={handleInputChange}
        placeholder="Search"
      />
      <IconButton
        type="submit"
        sx={{
          color: 'primary.dark',
          p: '10px',
          transition: '0.3s',
          '&:hover': {
            color: 'primary.light',
          },
        }}
      >
        <SearchRoundedIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
