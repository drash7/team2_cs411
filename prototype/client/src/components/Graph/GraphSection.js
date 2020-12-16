import React, {useState, useContext, Component} from 'react'
import { useAsync } from "react-async"
import { Container, Button } from '../../globalStyles'
import Graph from './Graph'
import Timer from './../Loading/Timer'
import RecommendationBox from "./RecommendationBox"
import PlaylistImageStack from "./PlaylistImageStack"
import { Link } from 'react-router-dom';
import { 
    GraphSec, 
    GraphRow,
    GraphContainer,
    RecommendationsContainer,

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

    // https://stackoverflow.com/questions/19269545/how-to-get-a-number-of-random-elements-from-an-array
    getRandom(arr, n) {
        var result = new Array(n),
            len = arr.length,
            taken = new Array(len);
        if (n > len)
            throw new RangeError("getRandom: more elements taken than available");
        while (n--) {
            var x = Math.floor(Math.random() * len);
            result[n] = x in taken ? taken[x] : x;
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    }

    async callAPI() {
        const res = await fetch(`http://localhost:9000/bridge?uuid2=${this.props.context.graphData.friendCode}&username=${this.state.username}&access_token=${this.state.access_token}`)
        const data = await res.json();

        if (!res.ok) {
            this.setState({ error: true })
            throw new Error(res.statusText)
        } else {
            const idx = this.getRandom(data.graph.nodes, 4);

            const playlistPictures = idx.map(i => data.graph.nodes[i].photo);

            this.setState({ "playlistPictures": playlistPictures, "data": data, "dataLoaded": true })
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
    }

    render() {
        if (this.state.dataLoaded) {
            return (
                <>
                    <GraphSec>

                        <GraphContainer>
                            <GraphRow>
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
                            <h2 style={{ "textAlign": "center" }}>
                                Some artists you might (both) like
                            </h2>
                            <div style={ { "textAlign":"center" }}>
                                {this.state.data.recommendations.map(artist => {
                                    return (<RecommendationBox key={artist.name} artist={artist} />)
                                })}
                            </div>
                        </RecommendationsContainer>

                        <Container>
                            <PlaylistImageStack pictures={this.state.playlistPictures}/>
                            <button onClick={() => this.playlistHandler()}class={"button"}>Export It!</button>
                        </Container>

                    </GraphSec>
                </>
            )
        } else if (this.state.error) {
            return (
                <>
                    <GraphSec>
                        <Container>
                            <h1>An error occurred :(</h1>
                            <button onClick={() => { window.redirect("/dashboard")}} class={"button"}>Try again!</button>
                        </Container>
                    </GraphSec>
                </>
            )
        }
        else {
            return (
                <>
                    <GraphSec>
                        <Container>
                            <Timer />
                        </Container>
                    </GraphSec>
                </>
            )
        }
    }
}

export default GraphSection
