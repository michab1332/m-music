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
        <div>
            <p>hello {name}</p>
        </div>
    )
}

export default PlaylistQuestionnaire;