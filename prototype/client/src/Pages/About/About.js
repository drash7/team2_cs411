import React from 'react';
import { Header, InfoSection } from '../../components'
import { aboutObjOne } from './Data'

const About = () => {
    return (
        <> 
            <Header />
            <InfoSection {...aboutObjOne} />
        </>
        
    );
};


export default About;