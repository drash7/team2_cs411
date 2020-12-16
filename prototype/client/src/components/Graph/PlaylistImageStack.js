import React, { Component } from 'react';

class PlaylistImageStack extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    goToArtistPage() {
        window.open(this.props.artist.url, "_blank");
    }

    render() {
        return (
            <div>
                <h2 style={{"margin-top": "3vw", "text-align": "center",}}>We've Made you a playlist</h2>
                <div style={{ width: 280, "margin-left": "auto", "margin-right": "auto", "margin-top": "1vw", "margin-bottom": "1vw", position: "relative"}}>
                    {this.props.pictures.map((pic, pos) => {
                        return <img
                            key={pic}
                            src={pic}
                            width={160}
                            height={160}
                            style={{
                                display: "inline-block",
                                position: "absolute",
                                left: 40 * (pos),
                                top: 0,
                                "border-radius": "50%",
                                "z-index": 4 - pos
                            }}
                        >
                        </img>
                    })}
                </div>
            </div>
        )
    }
}

export default PlaylistImageStack;