import { useEffect } from 'react';

import Menu from './components/menu'
import HeroPage from './components/heroPage';
import TopTracksSection from './components/topTracksSectionElements/topTracksSection';

import './App.css';

const CLIENT_ID = '9c8c76ea27ae46618af6ad0921529907';
const SPOTIFY_AUTHORIZE_ENDPOINT = 'https://accounts.spotify.com/authorize';
const REDIRECT_URL_AFTER_LOGIN = 'http://localhost:3000';
const SCOPES = ['user-read-currently-playing', 'user-read-playback-state'];
const SCOPES_URL_PARAMS = SCOPES.join("%20");

const getReturnedParamsFromSpotifyAuth = (hash) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split('&');
  const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
    const [key, value] = currentValue.split('=');
    accumulater[key] = value;
    return accumulater;
  }, {})
  return paramsSplitUp;
}

function App() {
  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } = getReturnedParamsFromSpotifyAuth(window.location.hash);

      localStorage.clear();
      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('expiresIn', expires_in);
      localStorage.setItem('tokenType', token_type);
    }
  })
  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=&${SCOPES_URL_PARAMS}&response_type=token&show_dialog=true`;
  }
  return (
    <div className="App">
      <Menu handleLogin={handleLogin} />
      <HeroPage />
      <TopTracksSection />
    </div>
  );
}

export default App;
