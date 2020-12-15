import React, {useState, useContext} from 'react'
import { useAsync } from "react-async"
import { Container, Button } from '../../globalStyles'
import Graph  from './Graph'
import { Link } from 'react-router-dom';
import { 
    GraphSec, 
    GraphRow,
    TopLine,
    FormInput,
    FormButton,
    Text,
    CodeButton,
    ButtonWrapper,
    Line,
    FormWrapper
} from './GraphSection.elements'

import { GraphContext } from "../../contexts/GraphContextProvider";


async function callAPI(graphData) {
    const res = await fetch(`http://localhost:9000/bridge?uuid2=${graphData.friendCode}&username=${window.username}&access_token=${window.access_token}`)
    if (!res.ok) throw new Error(res.statusText)
    return res.json()
}

const GraphSection = ( { primary, topLine, lightTopLine, buttonLabel, userCode } ) => {
    const { graphData, setData } = useContext(GraphContext);
    // const [graphDatas, setDatas] = useState({});
    let bridgeData;

    React.useEffect(async () => {
        bridgeData = await callAPI(graphData);
    }, []);

    if (bridgeData === undefined) {
        return (
            <>
                <GraphSec>
                    <Container>
                        <GraphRow>
                            <TopLine lightTopLine={lightTopLine}>
                                {topLine}
                                {graphData.friendCode}
                            test
                        </TopLine>
                            <p>PeePeePooPoo</p>
                        </GraphRow>

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
                            <TopLine lightTopLine={lightTopLine}>
                                {topLine}
                                {graphData.friendCode}
                            test
                        </TopLine>
                            {/* {console.log(testing)} */}
                            {console.log(window.access_token)}
                            {console.log(window.username)}
                            {/* {console.log(graphDatas)} */}
                            {/* {console.log(graphData)} */}
                            <Graph graph={bridgeData.graph} users={bridgeData.users} height={window.innerHeight} width={window.innerWidth} />
                        </GraphRow>

                    </Container>
                </GraphSec>
            </>
        )
    }
}

export default GraphSection
