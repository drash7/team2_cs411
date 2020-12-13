import React from 'react'
import { Container, Button } from '../../globalStyles'
import { Link } from 'react-router-dom';
// import { Timer } from './Timer';
import { 
    DashboardSec, 
    DashboardRow,
    Heading
} from './LoadingSection.elements'


const LoadingSection = ( { primary, topLine, lightTopLine, buttonLabel, userCode, lightText, headline, friendsCode, bottomText } ) => {
    return (
        <>
            <DashboardSec>
                <Container>
                    <DashboardRow>
                        {/* <topLine lightTopLine={lightTopLine}> { topLine } </topLine> */}
                        <Heading lightText={lightText}> {headline} {friendsCode} </Heading>
                        {/* <Timer /> */}
                        <Heading lightText={lightText}> {bottomText} </Heading>
                    </DashboardRow>

                </Container>
            </DashboardSec>
        </>
    )
}

export default LoadingSection
