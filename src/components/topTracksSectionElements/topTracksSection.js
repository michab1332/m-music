import { useState, useEffect } from 'react'
//import SpotifyWebApi from 'spotify-web-api-js';
import axios from 'axios';

import TopTrackSection from './topTrackSection';

import '../../styles/topTracksSection.css'

const DATA_TOP_TRACKS_IN_THE_WORLD = [
    {
        id: 1,
        nameOfArtist: "Oliwka Brazylia",
        nameOfSong: "Duza Mama",
        imgUrl: "https://t2.genius.com/unsafe/409x409/https%3A%2F%2Fimages.genius.com%2Fa1dad51f2cc2782a8b7108a931420c3e.1000x1000x1.jpg"
    },
    {
        id: 2,
        nameOfArtist: "Oliwka Brazylia",
        nameOfSong: "Duza Mama",
        imgUrl: "https://t2.genius.com/unsafe/409x409/https%3A%2F%2Fimages.genius.com%2Fa1dad51f2cc2782a8b7108a931420c3e.1000x1000x1.jpg"
    },
    {
        id: 3,
        nameOfArtist: "Oliwka Brazylia",
        nameOfSong: "Duza Mama",
        imgUrl: "https://t2.genius.com/unsafe/409x409/https%3A%2F%2Fimages.genius.com%2Fa1dad51f2cc2782a8b7108a931420c3e.1000x1000x1.jpg"
    },
    {
        id: 4,
        nameOfArtist: "Oliwka Brazylia",
        nameOfSong: "Duza Mama",
        imgUrl: "https://t2.genius.com/unsafe/409x409/https%3A%2F%2Fimages.genius.com%2Fa1dad51f2cc2782a8b7108a931420c3e.1000x1000x1.jpg"
    },
    {
        id: 5,
        nameOfArtist: "Oliwka Brazylia",
        nameOfSong: "Duza Mama",
        imgUrl: "https://t2.genius.com/unsafe/409x409/https%3A%2F%2Fimages.genius.com%2Fa1dad51f2cc2782a8b7108a931420c3e.1000x1000x1.jpg"
    }
]

const SPOTIFY_TOP_5_POLAND_ENDPOINT = "37i9dQZEVXbN6itCcaL3Tt";
const SPOTIFY_TOP_5_WORLD_ENDPOINT = "37i9dQZEVXbMDoHDwVN2tF";

function TopTracksSection({ token, handleGetUri }) {

    const [dataWorld, setDataWorld] = useState([])
    const [dataPoland, setDataPoland] = useState([])

    useEffect(() => {
        handleGetTracksWorld(SPOTIFY_TOP_5_WORLD_ENDPOINT)
        handleGetTracksPoland(SPOTIFY_TOP_5_POLAND_ENDPOINT)
    }, [])


    const handleGetTracksWorld = async (playlistId) => {
        try {
            const resp = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?fields=items(track)&limit=5`, {
                headers: {
                    Authorization: 'Bearer ' + token
                },
            })
            setDataWorld(resp.data.items)
        } catch (err) {
            console.log(err)
        }
    }

    const handleGetTracksPoland = async (playlistId) => {
        try {
            const resp = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?fields=items(track)&limit=5`, {
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
            <TopTrackSection name="World" color="transparent" black={false} data={dataWorld} handleGetUri={handleGetUri} />
            <TopTrackSection name="Poland" color="#D4213D" black={true} data={dataPoland} handleGetUri={handleGetUri} />
        </div>
    )
}


export default TopTracksSection;