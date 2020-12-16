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
                <h2 style={{"marginTop": "3vw", "textAlign": "center",}}>We've Made you a playlist</h2>
                <div style={{ width: 280, "marginLeft": "auto", "marginRight": "auto", "marginTop": "1vw", "marginBottom": "1vw", position: "relative"}}>
                    {this.props.pictures.map((pic, pos) => {
                        return <img
                            alt={""}
                            key={pic}
                            src={pic}
                            width={160}
                            height={160}
                            style={{
                                position: "absolute",
                                left: 40 * (pos),
                                top: 0,
                                "borderRadius": "50%",
                                "zIndex": 4 - pos
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