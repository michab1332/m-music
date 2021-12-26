import { useState, useEffect } from 'react'
import axios from 'axios';

import '../styles/playlistQuestionnaire.css'

const QUESTIONS = [
    {
        questionName: "Coś nowego, czy raczej coś co dobrze już znasz?",
        answers: {
            a: {
                title: "Coś co znam",
                type: "saved"
            },
            b: {
                title: "Coś nowego",
                type: "notSaved"
            }
        }
    },
    {
        questionName: "Popularne?",
        answers: {
            a: {
                title: "Tak",
                type: "popular"
            },
            b: {
                title: "Nie",
                type: "notPopular"
            }
        }
    },
    {
        questionName: "Imprezowe, czy spokojne?",
        answers: {
            a: {
                title: "Imprezowe",
                type: "party"
            },
            b: {
                title: "Spokojne",
                type: "chill"
            }
        }
    },
    {
        questionName: "Jak się teraz czujesz?",
        answers: {
            a: {
                title: "Dobrze",
                type: "goodMood"
            },
            b: {
                title: "Zle",
                type: "badMood"
            }
        }
    }
]

const SPOTIFY_GET_FAV_TRACKS = "https://api.spotify.com/v1/me/top/tracks?limit=50"
const SPOTIFY_GET_NAME = "https://api.spotify.com/v1/me"
const SPOTIFY_GET_SAVED_TRACKS = "https://api.spotify.com/v1/me/tracks?limit=30"
const SPOTIFY_GET_TOPLIST_TRACKS = "https://api.spotify.com/v1/playlists/37i9dQZEVXbN6itCcaL3Tt/tracks"
const SPOTIFY_GET_PARTY_TRACKS = "https://api.spotify.com/v1/playlists/37i9dQZF1DX6gb9mP6Vy34/tracks"
const SPOTIFY_GET_UPMOOD_TRACKS = "https://api.spotify.com/v1/playlists/37i9dQZF1DX3rxVfibe1L0/tracks"
const SPOTIFY_GET_CHILL_TRACKS = "https://api.spotify.com/v1/playlists/37i9dQZF1DXakrXW5YU9SI/tracks"

function Questionaire({ token, numberOfItem, handleChangeQuestion, handleOnAnswerChange, getDataFromSpotifyApi }) {
    const [name, setName] = useState('')
    useEffect(() => {
        Promise.resolve(getDataFromSpotifyApi(SPOTIFY_GET_NAME)).then(res => {
            setName(res.display_name)
        })
    }, [])

    return (
        <div className='containerQuestionnaire'>
            <p className='containerQuestionnaire-text'>Make your own playlist</p>
            <div className='containerQuestionnaire__questionnaireWrapper'>
                <p className='containerQuestionnaire__questionnaireWrapper-text'>{numberOfItem > 0 && numberOfItem <= QUESTIONS.length ? QUESTIONS[numberOfItem - 1].questionName : `${name}, answer a few questions to match the playlist to your mood`}</p>
                {numberOfItem > 0 && numberOfItem <= QUESTIONS.length ? <div onClick={(e) => handleOnAnswerChange(e)} className='containerQuestionnaire__questionnaireWrapper-questions'>
                    <div><input type="radio" value={QUESTIONS[numberOfItem - 1].answers.a.type} name="answer" />{QUESTIONS[numberOfItem - 1].answers.a.title}</div>
                    <div><input type="radio" value={QUESTIONS[numberOfItem - 1].answers.b.type} name="answer" />{QUESTIONS[numberOfItem - 1].answers.b.title}</div>
                </div> : null}
                <button onClick={handleChangeQuestion} className='containerQuestionnaire__questionnaireWrapper-button'>click to see questions</button>
            </div>
        </div>
    )
}

function GeneratePlaylist({ typesTab, token, getDataFromSpotifyApi }) {
    const [data, setData] = useState([])
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
        if (typesTab.includes('chill')) {
            Promise.resolve(getDataFromSpotifyApi(SPOTIFY_GET_CHILL_TRACKS)).then((res) => {
                setData(prevState => [...prevState, ...getRandomTracks(res.items)])
            })
        }
        if (typesTab.includes('popular')) {
            //console.log(data)
        }
        if (typesTab.includes('notPopular')) {
            //console.log(data)
        }
    }

    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    const getRandomTracks = (array) => {
        let tab = []
        for (let i = 0; i <= 10; i++) {
            const rand = getRandomInt(0, array.length)
            tab.push(rand)
        }
        const gArray = array.filter((item, index) => {
            return tab.includes(index)
        })
        return (gArray)
    }

    return (
        <div className='containerQuestionnaire'>
            {console.log(data)}
        </div>
    )
}

function PlaylistQuestionnaire({ token }) {
    const [numberOfItem, setNumberOfItem] = useState(0)
    const [type, setType] = useState('')
    const [typesTab, setTypesTab] = useState([])
    const handleChangeQuestion = () => {
        setNumberOfItem(prevState => prevState + 1)
        setTypesTab([type, ...typesTab])
        setType('')
    }
    const handleOnAnswerChange = (event) => {
        setType(event.target.value)
    }
    const getDataFromSpotifyApi = async (endpoint) => {
        const resp = await axios.get(endpoint, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return resp.data
    }
    return (
        numberOfItem === 5 ? <GeneratePlaylist typesTab={typesTab} token={token} getDataFromSpotifyApi={getDataFromSpotifyApi} /> : <Questionaire getDataFromSpotifyApi={getDataFromSpotifyApi} token={token} numberOfItem={numberOfItem} handleChangeQuestion={handleChangeQuestion} handleOnAnswerChange={handleOnAnswerChange} />
    )
}

export default PlaylistQuestionnaire;