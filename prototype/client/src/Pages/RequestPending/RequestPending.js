import React from 'react';
import { Header, LoadingSection } from '../../components'
import { dashboardObjOne } from './Data';

const RequestPending = () => {
  return (
    <>
      <Header />
      <LoadingSection {...dashboardObjOne}/>
    </>
    
  );
};


export default RequestPending;