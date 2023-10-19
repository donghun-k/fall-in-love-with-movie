import { ChangeEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useSearch = () => {
  const [searchInput, setSearchInput] = useState('');

  const navigate = useNavigate();
  const handleSearch = () => {
    if (searchInput.trim() === '') return;
    navigate(`/search?query=${searchInput.trim()}`);
  };
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.value.length > 30) {
      alert('검색어는 30자 이내로 입력해주세요.');
      return;
    }
    setSearchInput(e.target.value);
  };

  return { searchInput, handleInputChange, handleSearch };
};

export default useSearch;
