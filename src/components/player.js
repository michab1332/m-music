import { useState } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback';

import '../styles/player.css'

function Player({ token, uri, lyrics }) {
    const [isVisible, setIsVisible] = useState(false)
    const handleOnClickLyrics = () => {
        setIsVisible(prevState => !prevState)
    }
    if (!token) return null
    return (
        <div className='playerContainer'>
            <div className='lyricsContainer'>
                <p onClick={handleOnClickLyrics} className='lyricsContainer-text'>{isVisible ? "hide lyrics" : "show lyrics"}</p>
                <div className={isVisible ? 'lyricsContainer__lyricsWrapper' : '-notVisible'}>
                    {lyrics ? lyrics.lyrics : "Not Found"}
                </div>
            </div>
            <SpotifyPlayer token={token} uris={uri ? [uri] : []} autoPlay={true} showSaveIcon={true} />
        </div>
    )
}

export default Player;