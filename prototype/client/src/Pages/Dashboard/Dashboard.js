import React, {Component} from 'react';
import { Header, DashboardSection } from '../../components'
import { dashboardObjOne } from './Data';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {apiResponse: ""};
    }

    callAPI() {
        fetch("http://localhost:9000/callback")
            .then(res => res.text())
            .then(res => console.log(res))
            .catch(err => err);
    }

    componentDidMount() {
        this.callAPI();
    }

    render() {
        return (
            <>
                <Header/>
                <DashboardSection {...dashboardObjOne}/>
            </>

        );
    };
};


export default Dashboard;
