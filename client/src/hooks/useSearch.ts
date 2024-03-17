import { useSnackbar } from 'notistack';
import { ChangeEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useSearch = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = () => {
    if (searchInput.trim() === '') return;
    navigate(`/search?query=${searchInput.trim()}`);
  };
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.value.length > 30) {
      enqueueSnackbar('검색어는 30자를 넘을 수 없습니다.', {
        variant: 'error',
      });
      return;
    }
    setSearchInput(e.target.value);
  };

  return { searchInput, handleInputChange, handleSearch };
};

export default useSearch;
