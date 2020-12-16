import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import CircleLoader from './loadingAnimation';


class Timer extends Component   {
    constructor(props)  {
        super(props)
        this.state = {}
    }
    render()    {
        return (
            <div style={{width:"100%"}}>
                    <CircleLoader />
            </div>
        )
    }
}

export default Timer
