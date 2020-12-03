import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
// import { Button } from '../../globalStyles'
// import { Link } from 'react-router-dom';

import {
    Nav,
    NavBarContainer,
    NavLogo,
    Logo,
    MobileIcon,
    NavMenu,
    NavItem,
    NavLink,
    // NavItemBtn,
    // NavBtnLink
} from './Header.elements'

import LogoSrc from '../../assets/images/MusicBridgeLogo.png';

const Header = () => {
    const [click, setClick] = useState(false);
    // const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);

    // const showButton = () => {
    //     if(window.innerWidth <= 960) {
    //         setButton(false)
    //     } else {
    //         setButton(true)
    //     }
    // }

    // useEffect(() => {
    //     showButton()
    // }, [])

    // window.addEventListener('resize', showButton)

    return (
        <IconContext.Provider value = {{ color: '#fff' }}>
            <Nav>
                <NavBarContainer>
                    <MobileIcon onClick={handleClick}>
                        {click ? <FaTimes /> : <FaBars/>}
                    </MobileIcon>

                    <NavMenu onClick={handleClick} click={click}>
                        <NavItem>
                            <NavLink to = '/about'>About</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to = '/bridges'>Bridges</NavLink>
                        </NavItem>  
                        <NavItem>
                            <NavLink to = '/account'>My Account</NavLink>
                        </NavItem>  
                        <NavItem>
                            <NavLink to = '/'>Logout</NavLink>
                        </NavItem>

                        {/* <NavItemBtn>
                            {button ? (
                                <NavBtnLink>
                                    <Link to='/'>
                                        <Button primary >Logout</Button>
                                    </Link>
                                </NavBtnLink>
                            ) : (
                                <NavBtnLink>
                                    <Link to='/'>
                                        <Button>
                                            Logout
                                        </Button>
                                    </Link>
                                </NavBtnLink>
                            )}
                        </NavItemBtn>   */}
                    </NavMenu>

                    <NavLogo to="/dashboard">
                        <Logo src={LogoSrc} />
                    </NavLogo>


                    {/* <NavMenu onClick={handleClick} click={click}>
                        
                    </NavMenu> */}
                    

                </NavBarContainer>
            </Nav>
        </IconContext.Provider>
    
    );

};

export default Header;