import { useEffect, useState } from 'react';

import Menu from './components/menu'
import HeroPage from './components/heroPage';
import TopTracksSection from './components/topTracksSectionElements/topTracksSection';
import PlaylistQuestionnaire from './components/playlistQuestionnaire';
import Footer from './components/topTracksSectionElements/footer';
import Player from './components/player';

import './App.css';

const CLIENT_ID = '9c8c76ea27ae46618af6ad0921529907';
const SPOTIFY_AUTHORIZE_ENDPOINT = 'https://accounts.spotify.com/authorize';
const REDIRECT_URL_AFTER_LOGIN = 'http://localhost:3000';
const SCOPES = ["streaming", "user-read-email", "user-read-private", "user-read-playback-state", "user-modify-playback-state", "user-library-read"];
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
  const [token, setToken] = useState()
  const [uri, setUri] = useState()
  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } = getReturnedParamsFromSpotifyAuth(window.location.hash);

      localStorage.clear();
      localStorage.setItem('accessToken', access_token);
      setToken(access_token);
      localStorage.setItem('expiresIn', expires_in);
      localStorage.setItem('tokenType', token_type);
    }
  }, [])

  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAMS}&response_type=token&show_dialog=true`;
  }

  const handleGetUri = (uri) => {
    setUri(uri)
    console.log(uri)
  }
  return (
    <div className="App">
      <Menu handleLogin={handleLogin} />
      <HeroPage />
      {token !== undefined ? <TopTracksSection handleGetUri={handleGetUri} token={token} /> : null}
      {/* Spotify Player */}
      {token !== undefined && uri !== undefined ? <Player token={token} uri={uri} /> : null}
      {token !== undefined ? <PlaylistQuestionnaire token={token} /> : null}
      <Footer />
    </div>
  );
}

export default App;

//top 50 - polska 37i9dQZEVXbN6itCcaL3Tt
//top 50 - swiat 37i9dQZEVXbMDoHDwVN2tF