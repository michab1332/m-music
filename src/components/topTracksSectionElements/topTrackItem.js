import React from "react";

function TopTrackItem({ black, track, index, handleGetUri }) {
    const { name, artists, album } = track;
    return (
        <div onClick={() => handleGetUri(track.uri, artists[0].name, name)} className="containerTopTrackItem" style={black ? { color: "#fff" } : { color: "#000" }}>
            <div className="containerTopTrackItem__content">
                <img className="containerTopTrackItem__content-img" src={album.images[1].url} alt={name}></img>
                <div className="containerTopTrackItem__content__textWrapper">
                    <p className="containerTopTrackItem__content__textWrapper-name">{artists[0].name}</p>
                    <p className="containerTopTrackItem__content__textWrapper-songName">{name}</p>
                </div>
            </div>
            <p className="containerTopTrackItem__number">{index + 1}</p>
            {/* {console.log(track)} */}
        </div >
    )
}

export default TopTrackItem;