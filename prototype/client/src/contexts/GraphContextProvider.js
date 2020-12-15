//import data to local storage
import { createContext, useState } from "react";

export const GraphContext = createContext();

const GraphContextProvider = (props) => {
    const [graphData, setGraphData] = useState(
    //    {graph: {test: "test"}, recommendations: {}, users: {}}
        // {data:{}}
        {friendCode: ''}
    );

    // const setData = (graph, recommendations, users) => {
    //     setGraphData({graph: graph, recommendations: recommendations, users: users});
    // }
    // const setData = (data) => {
    //     setGraphData({data});
    // }
    const setData = (code) => {
        setGraphData({friendCode: code});
    }

    return (
        <GraphContext.Provider value={{graphData, setData}}>
            { props.children }
        </GraphContext.Provider>
    );
}

export default GraphContextProvider;