import React from 'react'
import { Container, Button } from '../../globalStyles'
import Graph  from './Graph'
import { Link } from 'react-router-dom';
import { 
    GraphSec, 
    GraphRow,
    FormInput,
    FormButton,
    Text,
    CodeButton,
    ButtonWrapper,
    Line,
    FormWrapper
} from './GraphSection.elements'


const DashboardSection = ( { primary, topLine, lightTopLine, buttonLabel, userCode } ) => {
    return (
        <>
            <GraphSec>
                <Container>
                    <GraphRow>
                        <Graph />
                    </GraphRow>

                </Container>
            </GraphSec>
        </>
    )
}

export default DashboardSection
