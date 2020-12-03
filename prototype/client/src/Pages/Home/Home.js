import React from 'react';
import { WelcomeSection } from '../../components'
import { homeObjOne } from './Data';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

const Home = (props) => {
  const {
    REACT_APP_CLIENT_ID,
    REACT_APP_AUTHORIZE_URL,
    REACT_APP_REDIRECT_URL
  } = process.env;
  const handleLogin = () => {
    window.location = `${REACT_APP_AUTHORIZE_URL}?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${REACT_APP_REDIRECT_URL}&response_type=token&show_dialog=true`;
  };
  return (
    <div className="login">
      <WelcomeSection {...homeObjOne} />
      
      <Button variant="info" type="submit" onClick={handleLogin}>
        Login to spotify
      </Button>
    </div>
  );
};
export default Home;