import { useState, useEffect } from 'react'
import axios from 'axios';

import GeneratePlaylist from './generatePlaylist';

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
const SPOTIFY_GET_NAME = "https://api.spotify.com/v1/me"

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

function PlaylistQuestionnaire({ token, handleGetUri }) {
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
        numberOfItem === 5 ? <GeneratePlaylist token={token} handleGetUri={handleGetUri} typesTab={typesTab} getDataFromSpotifyApi={getDataFromSpotifyApi} /> : <Questionaire getDataFromSpotifyApi={getDataFromSpotifyApi} token={token} numberOfItem={numberOfItem} handleChangeQuestion={handleChangeQuestion} handleOnAnswerChange={handleOnAnswerChange} />
    )
}

export default PlaylistQuestionnaire;