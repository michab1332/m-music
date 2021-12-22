import { useState, useEffect } from 'react';
import axios from 'axios';

import TopTrackSection from './topTrackSection';

import '../../styles/topTracksSection.css'

const SPOTIFY_TOP_5_POLAND_ENDPOINT = "37i9dQZEVXbN6itCcaL3Tt";
const SPOTIFY_TOP_5_WORLD_ENDPOINT = "37i9dQZEVXbMDoHDwVN2tF";

function TopTracksSection({ token, handleGetUri }) {

    const [dataWorld, setDataWorld] = useState([])
    const [dataPoland, setDataPoland] = useState([])
    const [numberOfTracks, setNumberOfTracks] = useState(4)

    useEffect(() => {
        handleGetTracksWorld(SPOTIFY_TOP_5_WORLD_ENDPOINT, numberOfTracks)
        handleGetTracksPoland(SPOTIFY_TOP_5_POLAND_ENDPOINT, numberOfTracks)
    }, [numberOfTracks])

    const handleGetMoreTracks = () => {
        setNumberOfTracks(prevState => prevState + 5)
    }

    const handleGetTracksWorld = async (playlistId, number) => {
        try {
            const resp = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?fields=items(track)&limit=${number}`, {
                headers: {
                    Authorization: 'Bearer ' + token
                },
            })
            setDataWorld(resp.data.items)
        } catch (err) {
            console.log(err)
        }
    }

    const handleGetTracksPoland = async (playlistId, number) => {
        try {
            const resp = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?fields=items(track)&limit=${number}`, {
                headers: {
                    Authorization: 'Bearer ' + token
                },
            })
            setDataPoland(resp.data.items)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="containerTopTracks">
            <TopTrackSection name="World" color="transparent" black={false} data={dataWorld} handleGetUri={handleGetUri} handleGetMoreTracks={handleGetMoreTracks} />
            <TopTrackSection name="Poland" color="#D4213D" black={true} data={dataPoland} handleGetUri={handleGetUri} handleGetMoreTracks={handleGetMoreTracks} />
        </div>
    )
}


export default TopTracksSection;