import React from 'react'

import TopTrackSection from './topTrackSection';

import '../../styles/topTracksSection.css'


function TopTracksSection() {
    return (
        <div className="containerTopTracks">
            <TopTrackSection name="World" color="transparent" black={false} />
            <TopTrackSection name="Poland" color="#D4213D" black={true} />
        </div>
    )
}


export default TopTracksSection;