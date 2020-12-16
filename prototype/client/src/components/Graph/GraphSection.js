import React, {useState, useContext, Component} from 'react'
import { useAsync } from "react-async"
import { Container, Button } from '../../globalStyles'
import Graph  from './Graph'
import RecommendationBox from "./RecommendationBox"
import PlaylistImageStack from "./PlaylistImageStack"
import { ReactPhotoCollage } from "react-photo-collage";
import { Link } from 'react-router-dom';
import { 
    GraphSec, 
    GraphRow,
    TopLine,
    GraphContainer,
    RecommendationsContainer,
    FormInput,
    FormButton,
    Text,
    CodeButton,
    ButtonWrapper,
    Line,
    FormWrapper
} from './GraphSection.elements'

import { GraphContextProvider,  GraphContext } from "../../contexts/GraphContextProvider";


// { primary, topLine, lightTopLine, buttonLabel, userCode }
class GraphSection extends Component {
    constructor(props) {
        super(props);
        // const { contextData, setData } = useContext(GraphContext);

        this.state = {
            username: window.username, 
            access_token: window.access_token,
            dataLoaded: false,
            data: {},
            error: false,
            playlistPictures: [],
            playlistLink: ""
        };
    }

    async wait(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
    });
}
    async callAPI() {
        const res = await fetch(`http://localhost:9000/bridge?uuid2=${this.props.context.graphData.friendCode}&username=${this.state.username}&access_token=${this.state.access_token}`)
        const data = await res.json();

        if (!res.ok) {
            this.setState({ error: true })
            throw new Error(res.statusText)
        } else {
            this.setState({ "data": data, "dataLoaded": true })
        }
    }

    async getPlaylist() {
        const res = await fetch(`http://localhost:9000/playlist?uuid2=${this.props.context.graphData.friendCode}&username=${this.state.username}&access_token=${this.state.access_token}`)
        const data = await res.json();
        if (!res.ok) {
            this.setState({ error: true })
            throw new Error(res.statusText)
        } else {
            this.setState({ "playlistLink": data.url})
        }
    }

    async playlistHandler() {
        if (this.state.playlistLink === "") {
            await this.getPlaylist();
        }

        window.open(this.state.playlistLink, "_blank")
    }

    async componentDidMount() {
        await this.callAPI();

        const idx = [];
        for (let i = 0; i < 4; i++) {
            let j;

            j = Math.floor(Math.random() * this.state.data.graph.nodes.length);

            idx.push(j);
        }

        const playlistPictures = idx.map(i => this.state.data.graph.nodes[i].photo);

        this.setState({ playlistPictures })
    }

    render() {
        if (this.state.dataLoaded) {
            return (
                <>
                    <GraphSec>

                        <GraphContainer>
                            <GraphRow>
                                <TopLine lightTopLine={this.props.lightTopLine}>
                                    {this.props.topLine}
                                    This do be the graph
                                    {console.log(this.state.data)}
                                </TopLine>

                                <div style={{width:"100%", height:"100%"}}></div>
                                    <Graph
                                        graph={this.state.data.graph}
                                        users={this.state.data.users}
                                        height={window.innerHeight}
                                        width={window.innerWidth}
                                    />
                            </GraphRow>
                        </GraphContainer>

                        <RecommendationsContainer>
                            <h2 style={{ "text-align": "center" }}>
                                Some artists you might (both) like
                            </h2>
                            <div style={ {"text-align":"center" }}>
                                {this.state.data.recommendations.map(artist => {
                                    return (<RecommendationBox artist={artist} />)
                                })}
                            </div>
                        </RecommendationsContainer>

                        <Container>
                            <PlaylistImageStack pictures={this.state.playlistPictures}/>
                        </Container>

                    </GraphSec>
                </>
            )
        } else {
            return (
                <>
                    <GraphSec>
                        <Container>
                            <GraphRow>
                                <TopLine lightTopLine={this.props.lightTopLine}>
                                    {this.props.topLine}
                                    {this.props.context.graphData.friendCode}
                            </TopLine>
                                <p>PeePeePooPoo</p>
                            </GraphRow>

                        </Container>
                    </GraphSec>
                </>
            )
        }
    }
}

export default GraphSection
