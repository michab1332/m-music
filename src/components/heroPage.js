import React, { useState } from 'react'

import '../styles/heroPage.css'

function HeroPage() {
    const [vector2Move, setVector2Move] = useState(false)

    const mouseEnter = (e) => {
        setVector2Move(prevState => true)
    }

    const mouseLeave = (e) => {
        setVector2Move(prevState => false)
    }

    return (
        <div className="containerHero">
            <section className="containerHero__wrapper">
                <div className="containerHero__heroImage">
                    <img className="containerHero__heroImage-vector1" src={require('../svg/vector1.svg').default} alt="vector1" />
                    <img className="containerHero__heroImage-img" src={require('../images/pexels-anna-shvets-4315839.png').default} alt="anna" />
                    <img onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} className={vector2Move ? "containerHero__heroImage-vector2 -move" : "containerHero__heroImage-vector2"} src={require('../svg/vector2.svg').default} alt="vector2" />
                </div>

                <section className="container__heroText">
                    <p className="container__heroText-titleText">Fresh Music from around the World</p>
                    <p className="container__heroText-description">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <button className="container__heroText-button">Click to see more</button>
                </section>
            </section>
            <div className="containerHero__textRoll">
                <div className="containerHero__textRoll__content">
                    <ul className="containerHero__textRoll-items">
                        <li className="containerHero__textRoll-item">the hottest hits</li>
                        <li className="containerHero__textRoll-item">the hottest hits</li>
                        <li className="containerHero__textRoll-item">the hottest hits</li>
                        <li className="containerHero__textRoll-item">the hottest hits</li>
                        <li className="containerHero__textRoll-item">the hottest hits</li>
                        <li className="containerHero__textRoll-item">the hottest hits</li>
                        <li className="containerHero__textRoll-item">the hottest hits</li>
                        <li className="containerHero__textRoll-item">the hottest hits</li>
                        <li className="containerHero__textRoll-item">the hottest hits</li>
                        <li className="containerHero__textRoll-item">the hottest hits</li>
                    </ul>
                </div>
            </div>
        </div >
    )
}

export default HeroPage