import React,{useState, useContext} from 'react'
import { Container, Button } from '../../globalStyles'
import { Link } from 'react-router-dom';
import { 
    DashboardSec, 
    DashboardRow,
    FormInput,
    FormButton,
    Text,
    CodeButton,
    ButtonWrapper,
    Line,
    FormWrapper
} from './DashboardSection.elements'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {  message } from 'antd';
import qs from 'querystring'
import { GraphContextProvider, GraphContext } from "../../contexts/GraphContextProvider";
import { resolveSoa } from 'dns';
// import qs from 'querystring'


const DashboardSection = ( { primary, topLine, lightTopLine, buttonLabel, userCode } ) => {
    const [uuid,setUuid] = useState()
    const { graphData, setData } = useContext(GraphContext);
    const graph = qs.parse(window.location.search);

    React.useEffect(() => {
        setData(uuid);
    }, [] );
    // const temp = 'test';
    // const [userData, setUserData] = useState({
    //     user: undefined,
    //   });

    // const setGraphData = (data) => {
    //     // window.graphData = data
    //     setUserData({user:data})
    // }
    const doConnect = ()=>{
        if(!uuid){
            return;
        } else {
        console.log(uuid)
        setData(uuid)
        // fetch(`http://localhost:9000/bridge?uuid2=${uuid}&username=${window.username}&access_token=${window.access_token}`)
        //     .then(res => res.json())
        //     .then(res => console.log(res.users))
            // .then(res => setData(res.graph, res.recommendations, res.users))
            // .then(res => setData(res))
            // .then(res => {setData({graph:res.graph, recommendations:res.recommendations, users:res.users});
            //     console.log(res);})
            // .then(data => console.log(data.users))
            // .then(data => console.log(data.graph))
            // .then(res => console.log(res.graph))
            // .then(res => setData(res.graph))
            // .then(() => console.log(temp))
            // .then(data => temp = data.users)
            // .then(() => console.log(temp))
            
            
            // .catch(err => err);
        }
        
    }
    return (
        <>
            <DashboardSec>
                <Container>
                    <DashboardRow>
                        <topLine lightTopLine={lightTopLine}> { topLine } </topLine>
                        
                        <FormWrapper>
                            <FormInput type='text' required value={uuid} onChange={e=>setUuid(e.target.value)}/>
                            <GraphContextProvider>
                                <Link to='/graph' onClick={doConnect}>
                                    <FormButton >Connect</FormButton>
                                </Link>
                            </GraphContextProvider>
                        </FormWrapper>

                        
                        <div>
                        <CopyToClipboard text={window.UUID} >      
                        <span><ButtonWrapper>
                            <CodeButton big fontBig primary={primary}>
                            {buttonLabel} 
                            </CodeButton>
                        </ButtonWrapper></span>
                        </CopyToClipboard>
                        </div>

                        <Text> { 'Your code: '+window.UUID } </Text>
                        <Line />
                    </DashboardRow>

                </Container>
            </DashboardSec>
        </>
    )
}

export default DashboardSection
