import React from "react";

function TopTrackItem({ black }) {
    return (
        <div className="containerTopTrackItem" style={black ? { color: "#fff" } : { color: "#000" }}>
            <div className="containerTopTrackItem__content">
                <img className="containerTopTrackItem__content-img" src="https://t2.genius.com/unsafe/409x409/https%3A%2F%2Fimages.genius.com%2Fa1dad51f2cc2782a8b7108a931420c3e.1000x1000x1.jpg" alt="big mommy"></img>
                <div className="containerTopTrackItem__content__textWrapper">
                    <p className="containerTopTrackItem__content__textWrapper-name">Oliwka Brazylia</p>
                    <p className="containerTopTrackItem__content__textWrapper-songName">Duza mama</p>
                </div>
            </div>
            <p className="containerTopTrackItem__number">1</p>
        </div>
    )
}

export default TopTrackItem;