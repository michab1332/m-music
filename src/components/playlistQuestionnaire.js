import { useState, useEffect } from 'react'
import axios from 'axios';

import '../styles/playlistQuestionnaire.css'

function PlaylistQuestionnaire({ token }) {
    const [name, setName] = useState('')
    useEffect(() => {
        handleGetName()
    }, [])
    const handleGetName = async () => {
        try {
            const resp = await axios.get("https://api.spotify.com/v1/me", {
                headers: {
                    Authorization: 'Bearer ' + token
                },
            })
            setName(resp.data.display_name)
        } catch (err) {
            if (err) console.log(err)
        }
    }
    return (
        <div className='containerQuestionnaire'>
            <p className='containerQuestionnaire-text'>Make your own playlist</p>
            <div className='containerQuestionnaire__questionnaireWrapper'>
                <p className='containerQuestionnaire__questionnaireWrapper-text'>Answer a few questions to match the playlist to your mood</p>
                <button className='containerQuestionnaire__questionnaireWrapper-button'>click to see questions</button>
            </div>
        </div>
    )
}

export default PlaylistQuestionnaire;