import { useEffect, useState } from 'react'

import TopTrackItem from './topTrackItem'

import '../../styles/topTracksSection.css'

function TopTrackSection({ name, color, black, data }) {
    const [dataOfTracks, setDataOfTracks] = useState([]);
    useEffect(() => {
        setDataOfTracks(data)
    }, [data])
    return (
        <div className="containerTopTrack" style={black ? { backgroundColor: "#000" } : { backgroundColor: "#fff" }}>
            <h1 className="containerTopTrack__titleText" style={black ? { color: "#fff" } : { color: "#000" }}>Top Tracks in the <span style={{ color: color }}>{name}</span></h1>
            {dataOfTracks.map(track => <TopTrackItem key={track.id} track={track} black={black} />)}
        </div>
    )
}

export default TopTrackSection