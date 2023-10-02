import { IconButton, InputBase, Paper } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');

  const navigate = useNavigate();
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (searchInput.trim() === '') return;
    navigate(`/search?query=${searchInput.trim()}`);
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
        backgroundColor: 'background.paper',
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        height: '50px',
        width: '200px',
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
        placeholder="Search"
      />
      <IconButton
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
