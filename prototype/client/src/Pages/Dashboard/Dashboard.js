import React from 'react';
import { Header, DashboardSection } from '../../components'
import { dashboardObjOne } from './Data';

const Dashboard = () => {
  return (
    <>
      <Header />
      <DashboardSection {...dashboardObjOne}/>
    </>
    
  );
};


export default Dashboard;