import React from 'react'
import { Container } from '../../globalStyles'
import {
    InfoSec,
    InfoRow,
    InfoColumn,
    TextWrapper,
    TopLine,
    Heading,
    Subtitle,
    ImgWrapper,
    Img
} from './accountPage';


const AccountIn = ( { lightBg, imgStart, lightTopLine, lightTextDesc, 
    lightText, topLine, description1, description2, description3, headline, image, start, alt} ) => {
    return (
        <InfoSec lightBg={lightBg}>
            <Container> 
                <InfoRow imgStart={imgStart}>
                    <InfoColumn>
                        <TextWrapper>
                            <TopLine lightTopLine={lightTopLine}>
                                {topLine}
                            </TopLine>
                            <Heading lightText={lightText}>
                                {headline}
                            </Heading>
                            <Subtitle lightTextDesc={lightTextDesc}>
                                {description1}
                            </Subtitle>
                            <Subtitle lightTextDesc={lightTextDesc}>
                                {description2}
                            </Subtitle>
                            <Subtitle lightTextDesc={lightTextDesc}>
                                {description3}
                            </Subtitle>
                        </TextWrapper>
                    </InfoColumn>
                    <InfoColumn>
                        <ImgWrapper  start={start}>
                            {console.log("BRUH" + image)}
                            <Img src={image} alt={alt} />
                        </ImgWrapper>
                    </InfoColumn>
                </InfoRow>
            </Container>
        </InfoSec>
    )
}

export default AccountIn