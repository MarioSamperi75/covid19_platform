import "./App.css";

import Layout from "./components/Layout/Layout";
import SvgMap from "./components/SvgMap/SvgMap";
import Table from "./components/Table/Table"

function App() {
  return (
    <div className="App">
        <Layout>
                <SvgMap />
                <Table />
        </Layout>
    </div>
  );
}

export default App;
