import React from 'react'
import { Container, Button } from '../../globalStyles'
import { Link } from 'react-router-dom';
import { 
    WelcomeSec,
    WelcomeRow, 
    WelcomeColumn,
    TextWrapper,
    TopLine,
    Heading,
    Subtitle,
    ImgWrapper,
    Img
} from './WelcomeSection.elements'

const WelcomeSection = ( { primary, lightBg, imgStart, lightTopLine, lightTextDesc, 
    lightText, topLine, description, headline, imgBackground, img, start, alt, buttonLabel} ) => {
        const {
            REACT_APP_CLIENT_ID,
            REACT_APP_AUTHORIZE_URL,
            REACT_APP_REDIRECT_URL
          } = process.env;
          const redirect='http://localhost:3000/redirect'
    return (
        <WelcomeSec imgUrl={process.env.PUBLIC_URL + imgBackground} lightBg={lightBg}>
            <Container>
                <WelcomeRow imgStart={imgStart}>
                    <WelcomeColumn>
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
                        {/* <Link to='/dashboard'> */}
                            <Button big fontBig primary={primary} onClick={()=>{
                                console.log(REACT_APP_REDIRECT_URL);
                                window.location= `${REACT_APP_AUTHORIZE_URL}?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${redirect}&response_type=token&show_dialog=true`
                                // interface url?
                            }}>
                                {buttonLabel}
                            </Button>
                        {/* </Link> */}
                    </WelcomeColumn>
                    <WelcomeColumn>
                        <ImgWrapper  start={start}>
                            <Img src={img} alt={alt} />
                        </ImgWrapper>
                    </WelcomeColumn>
                </WelcomeRow>
            </Container>

        </WelcomeSec>
            
    )
}

export default WelcomeSection
