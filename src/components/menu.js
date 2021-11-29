import React, { useState } from 'react'

import '../styles/menu.css'

function Menu() {
    const [search, setSearch] = useState();
    return (
        <div className="containerMenu">
            <div className="containerMenu__wrapper">
                <div className="containerMenu__logo">
                    <p className="containerMenu__logo-text">M&Music</p>
                </div>

                <div className="containerMenu__rightWrapper">
                    <form className="containerMenu__form">
                        <input onChange={(e) => setSearch(e.target.value)} value={search} className="containerMenu__form-input" type="text" placeholder="search music..." />
                        <img className="containerMenu__form-searchSymbol" src={require('../images/searchSymbol.png').default} alt="search icon" />
                    </form>

                    <div className="containerMenu__logIn">
                        <p className="containerMenu__logIn-text">Log in</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu