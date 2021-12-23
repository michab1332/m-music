import { useState, useEffect } from 'react'
import axios from 'axios';

import TopTrackItem from './topTracksSectionElements/topTrackItem';

import '../styles/menu.css'

function SearchTracks({ search, token, handleGetUri }) {
    const [data, setData] = useState([])
    useEffect(() => {
        handleSearchTracks()
        console.log(data)
    }, [search])

    const handleSearchTracks = async () => {
        const resp = await axios.get(`https://api.spotify.com/v1/search`, {
            params: { q: search, type: "track" },
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        setData(resp.data.tracks.items)
    }
    return (
        <div className='searchTracksContainer'>
            {data.map((item) => {
                return <TopTrackItem handleGetUri={handleGetUri} key={item.id} track={item} black={false} />
            })}
        </div>
    )
}

export default SearchTracks