import React from 'react'
import SpotifyPlayer from 'react-spotify-web-playback';

import '../styles/player.css'

function Player({ token, uri }) {
    if (!token) return null
    return (
        <div className='playerContainer'>
            <SpotifyPlayer token={token} uris={uri ? [uri] : []} autoPlay={true} />
        </div>
    )
}

export default Player;