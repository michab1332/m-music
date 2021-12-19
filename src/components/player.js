import React from 'react'
import SpotifyPlayer from 'react-spotify-web-playback';

function Player({ token, uri }) {
    return (
        <div>
            <SpotifyPlayer token={token} uri={uri} />
        </div>
    )
}

export default Player;