import React from "react";

function TopTrackItem({ black, track }) {
    const { id, nameOfArtist, nameOfSong, imgUrl } = track;
    return (
        <div className="containerTopTrackItem" style={black ? { color: "#fff" } : { color: "#000" }}>
            <div className="containerTopTrackItem__content">
                <img className="containerTopTrackItem__content-img" src={imgUrl} alt={nameOfSong}></img>
                <div className="containerTopTrackItem__content__textWrapper">
                    <p className="containerTopTrackItem__content__textWrapper-name">{nameOfArtist}</p>
                    <p className="containerTopTrackItem__content__textWrapper-songName">{nameOfSong}</p>
                </div>
            </div>
            <p className="containerTopTrackItem__number">{id}</p>
        </div>
    )
}

export default TopTrackItem;