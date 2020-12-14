import React, {Component} from 'react';
import { Header, DashboardSection } from '../../components'
import { dashboardObjOne } from './Data';
import qs from 'querystring'


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {apiResponse: ""};

    const user = qs.parse(window.location.search);
    console.log(user);
    if(!user.username)return
    window.username = user.username;
    window.userId = user.userId;
    window.email = user.email;
    window.country = user.country;
    window.access_token=user.access_token;
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
