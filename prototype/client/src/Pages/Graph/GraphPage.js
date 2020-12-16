import React, {Component} from 'react';
import { Header, GraphSection, Graph } from '../../components'
import { graphObjOne } from './Data';
import { GraphContext } from "./../../contexts/GraphContextProvider"

class GraphPage extends Component {
    render() {

        return (
    <GraphContext.Consumer>
        {
            context => (  
                <>                                   
                    <Header />
                    {/* <Graph /> */}
                    <GraphSection input={graphObjOne} context={context}/>
                </>
            )
        }
    </GraphContext.Consumer>
        );
    };
};


export default GraphPage;
