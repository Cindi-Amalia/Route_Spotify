import React, { useState } from 'react';
import Button from '../Button';
import './index.css';
import PropTypes from 'prop-types';
import Input from '../Input';
import { toast } from 'react-toastify';
import { searchTrack } from '../../lib/fetchApi.js';
import { useSelector } from 'react-redux';

 export default function SearchBar({ onSuccess, onClearSearch }) {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [text, setText] = useState('');
  const [isClear, setIsClear] = useState(true);

  const handleInput = (e) => {
    setText(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await searchTrack(text, accessToken);

      const tracks = response.tracks.items;
      onSuccess(tracks);
      setIsClear(false);
    } catch (e) {
      toast.error(e);
    }
  }

  const handleClear = () => {
    onClearSearch();
    setText('');
    setIsClear(true);
  }

  return (
    <div>
      <form className="form-search" onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Search..."
          className="form-search__input"
          required
          value={text}
          onChange={handleInput}
        />
        <Button type="submit">Search</Button>
      </form>

      {!isClear && (
        <Button variant="text" onClick={handleClear} className="mt-1">Clear search</Button>
      )}
    </div>
  )
}

SearchBar.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onClearSearch: PropTypes.func.isRequired,
}
