import Graph from "./components/Graph/Graph";
import data from "./test-data/dummy-graph-data.json";

const users = {
  user1: "Elisson",
  user2: "Rafael"
}

function App() {
  return (
    <div>
      <Graph users={users} graph={data} width={window.innerWidth} height={2*window.innerHeight/3}/>
    </div>
  );
}

export default App;
