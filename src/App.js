import "./App.css";
import { useState } from "react";
import Vehicles from "./components/Vehicles";

export default function App() {
  const [datasetId, setDatasetId] = useState(null);

  async function getDataset() {
    const data = await fetch("http://api.coxauto-interview.com/api/datasetId").then((res) =>
      res.json()
    );
    setDatasetId(data?.datasetId);
  }

  return (
    <div className="app-container">
      <header className="header">
        <div className="button-container">
          <h4>Get Vehicle Information:</h4>
          <button className="go-button" onClick={getDataset}>
            GO!
          </button>
        </div>
        <div>
          {datasetId ? (
            <p>
              Dataset Id: <span role="note">{datasetId}</span>
            </p>
          ) : (
            <p>No Dataset Id</p>
          )}
        </div>
      </header>
      <main style={{ padding: "1rem" }}>
        <Vehicles datasetId={datasetId} />
      </main>
    </div>
  );
}
