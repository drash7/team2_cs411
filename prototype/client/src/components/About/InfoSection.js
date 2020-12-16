import React from 'react'
import { Container } from '../../globalStyles'
import LogoSrc from '../../assets/images/MusicBridgeLogo.png';
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
} from './InfoSection.elements';


const InfoSection = ( { lightBg, imgStart, lightTopLine, lightTextDesc, 
    lightText, topLine, description, headline, img, start, alt} ) => {
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
                                {description}
                            </Subtitle>
                        </TextWrapper>
                    </InfoColumn>
                    <InfoColumn>
                        <ImgWrapper  start={start}>
                            <Img src={LogoSrc} alt={alt} />
                        </ImgWrapper>
                    </InfoColumn>
                </InfoRow>
            </Container>
        </InfoSec>
    )
}

export default InfoSection