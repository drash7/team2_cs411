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
                    onClick={() => this.goToArtistPage()} 
                    src={this.props.artist.photo}
                    style={{ 
                        "pointer-events": "all", 
                        "cursor": "pointer", 
                        "border-radius": "50%"
                    }}
                    width={160}
                    height={160}
                >
                </img>
                <p style={{ margin: "auto", "text-align": "center", "padding-top": 10}}>
                    {this.props.artist.name}
                </p>
            </div>
        )
    }
}

export default RecommendationBox;