import { useState, useEffect } from 'react'
import axios from 'axios'

import TopTrackItem from './topTracksSectionElements/topTrackItem'

import '../styles/playlistQuestionnaire.css'

const SPOTIFY_GET_FAV_TRACKS = "https://api.spotify.com/v1/me/top/tracks?limit=100"
const SPOTIFY_GET_SAVED_TRACKS = "https://api.spotify.com/v1/me/tracks?limit=30"
const SPOTIFY_GET_TOPLIST_TRACKS = "https://api.spotify.com/v1/playlists/37i9dQZEVXbN6itCcaL3Tt/tracks?limit=100"
const SPOTIFY_GET_PARTY_TRACKS = "https://api.spotify.com/v1/playlists/37i9dQZF1DX6gb9mP6Vy34/tracks?limit=100"
const SPOTIFY_GET_UPMOOD_TRACKS = "https://api.spotify.com/v1/playlists/37i9dQZF1DX3rxVfibe1L0/tracks?limit=100"
const SPOTIFY_GET_CHILL_TRACKS = "https://api.spotify.com/v1/playlists/37i9dQZF1DXakrXW5YU9SI/tracks?limit=100"
const SPOTIFY_GET_GOODMOOD_TRACKS = "https://api.spotify.com/v1/playlists/37i9dQZF1DXdmgtdl82XHM/tracks?limit=100"
const SPOTIFY_GET_NAME = "https://api.spotify.com/v1/me"


function GeneratePlaylist({ typesTab, getDataFromSpotifyApi, handleGetUri, token }) {
    const [data, setData] = useState([])
    const [id, setId] = useState('')
    useEffect(() => {
        getData()
    }, [])
    const getData = () => {
        if (typesTab.includes('saved')) {
            Promise.resolve(getDataFromSpotifyApi(SPOTIFY_GET_FAV_TRACKS)).then((res) => {
                setData(prevState => [...prevState, ...getRandomTracks(res.items)])
            })
        }
        if (typesTab.includes('party')) {
            Promise.resolve(getDataFromSpotifyApi(SPOTIFY_GET_PARTY_TRACKS)).then((res) => {
                setData(prevState => [...prevState, ...getRandomTracks(res.items)])
            })
        }
        if (typesTab.includes('badMood')) {
            Promise.resolve(getDataFromSpotifyApi(SPOTIFY_GET_UPMOOD_TRACKS)).then((res) => {
                setData(prevState => [...prevState, ...getRandomTracks(res.items)])
            })
        }
        if (typesTab.includes('goodMood')) {
            Promise.resolve(getDataFromSpotifyApi(SPOTIFY_GET_GOODMOOD_TRACKS)).then((res) => {
                setData(prevState => [...prevState, ...getRandomTracks(res.items)])
            })
        }
        if (typesTab.includes('chill')) {
            Promise.resolve(getDataFromSpotifyApi(SPOTIFY_GET_CHILL_TRACKS)).then((res) => {
                setData(prevState => [...prevState, ...getRandomTracks(res.items)])
            })
        }
        if (typesTab.includes('popular')) {
            setData(prevState => [...sortArrayDesceding(prevState)])
        }
        if (typesTab.includes('notPopular')) {
            setData(prevState => [...sortArrayAscending(prevState)])
        }
    }

    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    const getRandomTracks = (array) => {
        let tab = []
        for (let i = 0; i <= 15; i++) {
            const rand = getRandomInt(0, array.length)
            tab.push(rand)
        }
        const gArray = array.filter((item, index) => {
            return tab.includes(index)
        })
        return getFinalTab(gArray)
    }

    const getFinalTab = (array) => {
        let finalArray = array.map(item => {
            if (item?.track) return item.track
            return item
        })
        return finalArray
    }

    const sortArrayAscending = (array) => {
        let sortedArray = array.sort((a, b) => {
            return a.popularity - b.popularity
        })
        return sortedArray
    }

    const sortArrayDesceding = (array) => {
        let sortedArray = array.sort((a, b) => {
            return b.popularity - a.popularity
        })
        return sortedArray
    }

    const postTrackToPlaylist = (endpoint) => {
        axios({
            method: 'post',
            url: endpoint,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Bearer ' + token
            }
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const joinArray = (array) => {
        let gArray = array.map(item => {
            return item.uri
        })
        return gArray.join(',')
    }

    const addPlaylistToSpotifyAccount = () => {
        Promise.resolve(getDataFromSpotifyApi(SPOTIFY_GET_NAME)).then(res => {
            const postPlaylistToSpotifyAccount = `https://api.spotify.com/v1/users/${res.id}/playlists`
            axios({
                method: 'post',
                url: postPlaylistToSpotifyAccount,
                data: {
                    name: "mmusic",
                    description: "Playlist generated via mmusic",
                    public: false
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: 'Bearer ' + token
                }
            })
                .then(response => {
                    const spotifyPostTracks = `https://api.spotify.com/v1/playlists/${response.data.id}/tracks?uris=${joinArray(data)}`
                    postTrackToPlaylist(spotifyPostTracks)
                })
                .catch(error => {
                    console.log(error);
                })
        })
    }

    return (
        <div className='containerQuestionnaire --black'>
            <div className="containerGeneratePlaylist">
                <div className="conatinerGeneratePlaylist__title">
                    <p className="conatinerGeneratePlaylist__title-text">Your playlist</p>
                    <button onClick={addPlaylistToSpotifyAccount} className="conatinerGeneratePlaylist__title-button">add</button>
                </div>
                <p className="conatinerGeneratePlaylist__text">this playlist was generated by our algorithm</p>
                {data.map((item) => {
                    return <TopTrackItem handleGetUri={handleGetUri} key={item.id} track={item} black={true} />
                })}
            </div>
        </div>
    )
}

export default GeneratePlaylist