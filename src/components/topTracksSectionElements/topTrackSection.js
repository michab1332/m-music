import React from 'react'

import TopTrackItem from './topTrackItem'

import '../../styles/topTracksSection.css'

function TopTrackSection({ name, color, black }) {
    return (
        <div className="containerTopTrack" style={black ? { backgroundColor: "#000" } : { backgroundColor: "#fff" }}>
            <h1 className="containerTopTrack__titleText" style={black ? { color: "#fff" } : { color: "#000" }}>Top Tracks in the <span style={{ color: color }}>{name}</span></h1>
            <TopTrackItem />
            <TopTrackItem />
            <TopTrackItem />
        </div>
    )
}

export default TopTrackSection