import React from 'react'

import '../../styles/footer.css'

function Footer() {
    return (
        <footer>
            <div className='footer__wrapperTop'>
                <img className='footer__wrapperTop-svg' src={require('../../svg/vector3.svg').default} alt="vector3" />
                <p className='footer__wrapperTop-smallText'>Share your favourite tracks with friends and followers</p>
                <p className='footer__wrapperTop-titleText'>#M&Music</p>
            </div>
            <div className='footer__wrapperBottom'>
                <ul className='footer__wrapperBottom-list'>
                    <li className='footer__wrapperBottom-listItem'>contact</li>
                    <li className='footer__wrapperBottom-listItem'>spotify api</li>
                    <li className='footer__wrapperBottom-listItem'>my github</li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer