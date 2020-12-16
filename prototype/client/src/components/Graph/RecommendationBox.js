import React, { Component } from 'react';

class RecommendationBox extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    goToArtistPage() {
        window.open(this.props.artist.url, "_blank");
    }

    render() {
        return (
            <div style={{display:"inline-block", margin:"0.5vw", width: 160, }}>
                <img 
                    alt=""
                    onClick={() => this.goToArtistPage()} 
                    src={this.props.artist.photo}
                    style={{ 
                        "pointerEvents": "all", 
                        "cursor": "pointer", 
                        "borderRadius": "50%",
                        "maxWidth": "100%",
                        "width": "100%",
                        "height": "100%"
                    }}
                >
                </img>
                <p style={{ "margin": "auto", "textAlign": "center", "paddingTop": 10}}>
                    {this.props.artist.name}
                </p>
            </div>
        )
    }
}

export default RecommendationBox;