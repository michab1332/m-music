import React from 'react'

import '../styles/heroPage.css'

function HeroPage() {
    return (
        <div className="containerHero">
            <section className="containerHero__wrapper">
                <div className="containerHero__heroImage">
                    <img className="containerHero__heroImage-vector1" src={require('../svg/vector1.svg').default} alt="vector1" />
                    <img className="containerHero__heroImage-img" src={require('../images/pexels-anna-shvets-4315839.png').default} alt="anna" />
                    <img className="containerHero__heroImage-vector2" src={require('../svg/vector2.svg').default} alt="vector2" />
                </div>
            </section>
        </div>
    )
}

export default HeroPage