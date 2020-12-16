import styled from 'styled-components'

export const GraphSec = styled.div`
    color: #fff;
    padding: 160px 0;
    max-width: 100%;
    max-height: 100%;
    background: ${({ lightBg }) => (lightBg ? '#fff' : '#101522')};

    @media screen and (max-width: 960px) {
        padding-left: 5vh;
        padding-right: 5vh;
    }
`

export const GraphContainer = styled.div`
z-index: 1;
width: 70%;
height: 40%;
margin-right: auto;
margin-left: auto;


@media screen and (max-width: 991px) {
    padding-right: 30px;
    padding-left: 30px;
}
`

export const GraphRow = styled.div`
    max-width: 100%;
    max-height: 60%;
    padding-top: 0;
    padding-bottom: 60px;

    margin: 0 auto;
    @media screen and (max-width: 960px) {
        padding-bottom: 65px;
    }
`;

export const ButtonWrapper = styled.div`
    max-width: 540px;
    padding-top: 200px;
    padding-bottom: 30px;

    margin: 0 auto;
    @media screen and (max-width: 960px) {
        padding-bottom: 65px;
    }
`;

export const TopLine = styled.div`
    color: ${({ lightTopLine }) => (lightTopLine ? '#a9b3c1' : '#A9D046')};
    padding: 8px;
    font-size: 18px;
    line-height: 16px;
    font-weight: 700;
    letter-spacing: 1.4px;
    margin-bottom: 16px;
    
`;

export const FormWrapper = styled.div`
    max-width: 540px;
    padding-top: 16px;

    margin: 0 auto;
    @media screen and (max-width: 960px) {
        padding-bottom: 65px;
    }
`;

export const FormInput = styled.input`
    padding: 16px 16px ;
    font-size: 20px;
    border: none;
    border-radius: 4px;
    margin-bottom: 32px;
    float: left;
    width: 80%;
    background: #f1f1f1;

    @media screen and (max-width: 960px) {
        width: 70%;
    } 
`;

export const FormButton = styled.form`
    text-align: center; 
    float: left;
    width: 20%;
    padding: 16px 16px;
    background: #A9D046;
    color: #fff;
    font-size: 20px;
    border: none;
    border-radius: 4px;
    display: flex;
    cursor: pointer;

    @media screen and (max-width: 960px) {
        width: 30%;
    } 

    &:hover {
        background: #fff;
        transition: all 0.3s ease;
        background-color: #DFFF00; 
    }
`;

export const Text = styled.form`
    text-align: center;
    margin-top: 24px;
    color: #fff;
    font-size: 14px;
    padding: 20px;
`;

export const CodeButton = styled.button`
    border-radius: 4px;
    background: ${({ primary }) => (primary ? '#A9D046' : '#DFFF00') };
    white-space: nowrap;
    padding: ${({ big }) => (big ? '12px 64px' : '10px 20px')};
    color: #fff;
    font-size: ${({ fontBig }) => (fontBig ? '20px' : '16px')};
    outline: none;
    border: none;
    cursor: pointer;
    
    position: absolute;
    left: 50%;
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    
    &:hover {
        background: #fff;
        transition: all 0.3s ease;
        background-color: ${({ primary }) => (primary ? '#DFFF00' : '#A9D046')}
    }

    @media screen and (max-width: 960px) {
        width: 50%;
    } 
`

export const Line = styled.hr`
    border: 1px solid #fff;
    border-radius: 2px;
    display: block; 
`
