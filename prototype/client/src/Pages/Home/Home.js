import React from 'react';
import { WelcomeSection } from '../../components'
import { homeObjOne } from './Data';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';


const Home = (props) => {

  function handleLogin() {
    window.location = 'http://localhost:9000/login';
  };

  return (
    <div className="login">
      <WelcomeSection {...homeObjOne} />
      <Button variant="info" type="submit" onClick={handleLogin()}>Login to spotify</Button>
    </div>
  );
};


export default Home;
