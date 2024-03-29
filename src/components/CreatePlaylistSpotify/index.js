import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addTracksToPlaylist, createPlaylist } from '../../lib/fetchApi';
import Button from '../Button';
import Input from '../Input';
import InputGroup from '../InputGroup';
import './index.css';
import PropTypes from 'prop-types';
import { logout } from '../../slice/authSlice';

export default function CreatePlaylistForm({ uriTracks }) {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const userId = useSelector((state) => state.auth.user.id);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    title: '',
    description: '',
  });

  const [errorForm, setErrorForm] = useState({
    title: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
    setErrorForm({ ...errorForm, [name]: '' });
  }

  const validateForm = () => {
    let isValid = true;

    if (form.title.length < 10) {
      setErrorForm({
        ...errorForm,
        title: 'Title must be at least 10 characters long'
      });
      isValid = false;
    }

    if (form.description.length > 100) {
      setErrorForm({
        ...errorForm,
        description: 'Description must be less than 100 characters long'
      });
      isValid = false;
    }

    return isValid;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (uriTracks.length > 0) {
        try {
          const responseCreatePlaylist = await createPlaylist(accessToken, userId, {
            name: form.title,
            description: form.description,
          });

          await addTracksToPlaylist(accessToken, responseCreatePlaylist.id, uriTracks);

          toast.success('Playlist created successfully');

          setForm({ title: '', description: '' });
        } catch (error) {
          if (error.response.status === 401) {
            dispatch(logout());
          } else {
            toast.error(error.message);
          }
        }
      } else {
        toast.error('Please select at least one track');
      }
    }
  }

  return (
    <div className="create-playlist-form">
      <div>
        <h2>Create Playlist</h2>

        <form className="form form-playlist" onSubmit={handleSubmit}>
          <InputGroup>
            <Input
              label="Title"
              placeholder="Title of playlist"
              value={form.title}
              id="title-playlist"
              name="title"
              onChange={handleChange}
              error={errorForm.title}
              required
            />
          </InputGroup>
          <InputGroup>
            <Input
              type='textarea'
              label="Description"
              placeholder="Description of playlist"
              value={form.description}
              id="description-playlist"
              name="description"
              onChange={handleChange}
              required
              error={errorForm.description}
            />
          </InputGroup>

          <div className="form-playlist__action">
            <Button type="submit">Create</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

CreatePlaylistForm.propTypes = {
  uriTracks: PropTypes.array.isRequired,
};