import React, { useState } from 'react'

import '../styles/menu.css'

function Menu() {
    const [search, setSearch] = useState();
    return (
        <div className="container">
            <div className="container__wrapper">
                <div className="container__logo">
                    <p className="container__logo-text">M&Music</p>
                </div>

                <div className="container__rightWrapper">
                    <form className="container__form">
                        <input onChange={(e) => setSearch(e.target.value)} value={search} className="container__form-input" type="text" placeholder="search music..." />
                        <img className="container__form-searchSymbol" src={require('../images/searchSymbol.png').default} alt="search icon" />
                    </form>

                    <div className="container__logIn">
                        <p className="container__logIn-text">Log in</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu