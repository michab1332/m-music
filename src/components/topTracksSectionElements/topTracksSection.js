import { useState, useEffect } from 'react'
import axios from "axios"

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

function TopTracksSection() {
    const [token, setToken] = useState('')
    const [data, setData] = useState([])

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            setToken(localStorage.getItem('accessToken'))
        }
    }, [])

    useEffect(() => {
        handleGetTracks(SPOTIFY_TOP_5_POLAND_ENDPOINT)
        console.log(data)
    }, [])

    const handleGetTracks = (playlistId) => {
        axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?fields=items(track)&limit=5`, {
            headers: {
                Authorization: 'Bearer ' + token
            },
        }).then((response) => {
            setData(response.data)
        }).catch(err => console.log(err))
    }

    return (
        <div className="containerTopTracks">
            <TopTrackSection name="World" color="transparent" black={false} data={DATA_TOP_TRACKS_IN_THE_WORLD} />
            <TopTrackSection name="Poland" color="#D4213D" black={true} data={DATA_TOP_TRACKS_IN_THE_WORLD} />
        </div>
    )
}


export default TopTracksSection;