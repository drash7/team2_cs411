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
        window.displayName = user.username;
        window.username = user.userId;
        window.email = user.email;
        window.country = user.country;
        window.access_token=user["?access_token"];
        window.UUID = user.UUID;
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
