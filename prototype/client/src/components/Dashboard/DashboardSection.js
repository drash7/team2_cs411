import React from 'react'
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
    return (
        <>
            <DashboardSec>
                <Container>
                    <DashboardRow>
                        <topLine lightTopLine={lightTopLine}> { topLine } </topLine>
                        
                        <FormWrapper>
                            <FormInput type='text' required />
                            
                            <Link to = '/loading'>
                                <FormButton type='submit'>Connect</FormButton>
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

                        <Text> { 'Your code: '+window.userId  } </Text>
                        <Line />
                    </DashboardRow>

                </Container>
            </DashboardSec>
        </>
    )
}

export default DashboardSection
