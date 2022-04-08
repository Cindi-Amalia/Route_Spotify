import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { toast } from 'react-toastify';
import Button from '../components/Button';
import config from '../lib/config';
import { useDocumentTitle } from '../lib/customHooks';
import { getUserProfile } from '../lib/fetchApi';
import { login } from '../slice/authSlice';

export default function Auth() {
  const dispatch = useDispatch();
  const history = useHistory();
  useDocumentTitle('Auth - Spotify');

  useEffect(() => {
    const accessTokenParams = new URLSearchParams(window.location.hash).get('#access_token');
    const expiredDateParams = new URLSearchParams(window.location.hash).get('expires_in');

    if (accessTokenParams !== null) {
      const setUserProfile = async () => {
        try {
          const responseUser = await getUserProfile(accessTokenParams);

          dispatch(login({
            accessToken: accessTokenParams,
            expiredDate: +new Date() + expiredDateParams * 1000,
            user: responseUser,
          }));

          history.push('/create-playlist');
        } catch (error) {
          toast.error(error.message);
        }
      }

      setUserProfile();
    }
  }, []);

  const getSpotifyLinkAuthorize = () => {
    const state = Date.now().toString();
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

    return 'https://accounts.spotify.com/authorize?' + 
      `client_id=${clientId}` +
      `&response_type=token` +
      `&redirect_uri=http://localhost:3000` +
      `&state=${state}` +
      `&scope=${config.SPOTIFY_SCOPE}`;
  }

  return (
    <main className="center">
      <p>Login for Next Step...</p>
      <Button href={getSpotifyLinkAuthorize()} external>Authorize</Button>
    </main>
  )
}