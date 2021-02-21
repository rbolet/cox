import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [datasetId, setDatasetId] = useState("unknown");

  async function getDataset() {
    const data = await fetch("https://http://api.coxauto-interview.com/api/datasetId");
    setDatasetId(data);
  }

  return (
    <div className="app-container">
      <header className="header">
        <div className="button-container">
          <h4>Get Vehicle Information:</h4>
          <button className="go-button">GO!</button>
        </div>
        <div>
          <p>
            Dataset Id: <span>{datasetId}</span>
          </p>
        </div>
      </header>
      <main className="content"></main>
    </div>
  );
}

export default App;
