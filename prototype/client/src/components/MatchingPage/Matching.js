import React from 'react'
import { Container, Button } from '../../globalStyles'
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


const DashboardSection = ( { primary, topLine, lightTopLine, buttonLabel, userCode } ) => {
    return (
        <>
            <DashboardSec>
                <Container>
                    <DashboardRow>
                        <topLine lightTopLine={lightTopLine}> { topLine } </topLine>
                        
                        <FormWrapper>
                            <FormInput  type='text' required onClick={()=>{ }} />
                            <FormButton type='submit'>Connect</FormButton>
                        </FormWrapper>

                        <ButtonWrapper>
                            <CodeButton big fontBig primary={primary}>
                                { buttonLabel }
                            </CodeButton>
                        </ButtonWrapper>
                        <Text> { userCode } </Text>
                        <Line />
                    </DashboardRow>

                </Container>
            </DashboardSec>
        </>
    )
}

export default DashboardSection
