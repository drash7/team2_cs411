import React,{useState} from 'react'
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


const DashboardSection = ( { primary, topLine, lightTopLine, buttonLabel, userCode } ) => {
    const [uuid,setUuid] = useState()
    const doConnect = ()=>{
        if(!uuid){
            return;
        }
        fetch(`http://localhost:9000/bridge?uuid2=${uuid}&username=${window.username}&access_token=${window.access_token}`)
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => err);
    }
    return (
        <>
            <DashboardSec>
                <Container>
                    <DashboardRow>
                        <topLine lightTopLine={lightTopLine}> { topLine } </topLine>
                        
                        <FormWrapper>
                            <FormInput type='text' required value={uuid} onChange={e=>setUuid(e.target.value)}/>
                            
                            <Link to = '/loading' onClick={doConnect}>
                                <FormButton >Connect</FormButton>
                            </Link>
                        </FormWrapper>

                        
                        <div>
                        <CopyToClipboard text={window.userId} >      
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
