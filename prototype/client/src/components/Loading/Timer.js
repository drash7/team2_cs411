import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import CircleLoader from './loadingAnimation';

function Grid({ children }) {
    return (
        <div classname="grid">
            <LoadingBox>{children}</LoadingBox>
        </div>
    );
}

function LoadingBox({ children })   {
    return React.Children.map(children, child => {
        return <div classname="loading-box">{child}</div>
    })
}

class Timer extends Component   {
    constructor(props)  {
        super(props)
        this.state = {
            count: 0
        }
    }
    render()    {
        const {count} = this.state
        if (this.state.count === 0)    {
            window.location.replace('localhost:3000/graph');
        }
        return (
            <div>
                <Grid>
                    <CircleLoader />
                </Grid>
            </div>
        )
    }

    componentDidMount () {
        const {startCount} = this.props
        this.setState({
            count: startCount
        })
        this.myInterval = setInterval(() => {
            this.setState(prevState => ({
                count: prevState.count - 1
            }))
            
        }, 1000)
        
    }

    componentWillUnmount()  {
        clearInterval(this.myInterval)
    }
    // render()
}

export default Timer

// import React, { Component } from 'react'

// const Timer = () => {
//     state = {
//         minutes: 3,
//         seconds: 0,
//     }
//     componentDidMount() {
//         this.myInterval = setInterval(() => {
//             const { seconds, minutes } = this.state

//             if (seconds > 0) {
//                 this.setState(({ seconds }) => ({
//                     seconds: seconds - 1
//                 }))
//             }
//             if (seconds === 0) {
//                 if (minutes === 0) {
//                     clearInterval(this.myInterval)
//                 } else {
//                     this.setState(({ minutes }) => ({
//                         minutes: minutes - 1,
//                         seconds: 59
//                     }))
//                 }
//             } 
//         }, 1000)
//     }

//     componentWillUnmount() {
//         clearInterval(this.myInterval)
//     }

//     return (
//         <>

//             <div>
//                 { minutes === 0 && seconds === 0
//                     ? <h1>Busted!</h1>
//                     : <h1>Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
//                 }
//             </div>
//         <>
//     )

// }