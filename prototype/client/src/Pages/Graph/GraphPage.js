import React, {Component} from 'react';
import { Header, GraphSection, Graph } from '../../components'
import { graphObjOne } from './Data';

class GraphPage extends Component {
    render() {

        return (
            <>
                <Header/>
                <Graph />
                {/* <GraphSection {...graphObjOne}/> */}
            </>

        );
    };
};


export default GraphPage;
